"""
Shared path resolution for chatbot data sources — the Next.js frontend's
lib/*.ts data modules and select app/*/page.tsx files, which the chatbot
reads directly at startup/request time instead of duplicating their content
in a second, hand-typed copy.

FRONTEND_ROOT defaults to the parent of this chatbot/ directory — the local
development layout, where the frontend repo and chatbot/ are siblings. Set the
FRONTEND_ROOT environment variable to an absolute path if the chatbot is ever
deployed without the frontend repository physically alongside it (e.g. a
standalone container/service) — point it at wherever lib/ and app/ were
copied or mounted.

Every module that reads one of these frontend source files should resolve its
path through this module (via `resolve()` or `read_text()`) instead of
hand-building a relative path — one place to fix if the deployment layout
ever changes.
"""
import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)

_CHATBOT_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_ROOT = os.path.abspath(os.getenv("FRONTEND_ROOT") or os.path.join(_CHATBOT_DIR, ".."))

_missing_logged = set()


def resolve(relative_path: str) -> str:
    """Resolves a path like 'lib/faculty.ts' or 'app/iqac/page.tsx' — always
    relative to the repository root, never to '../' — against FRONTEND_ROOT.

    Pages live under app/(frontend)/ (a Next.js route group). Callers keep the
    public-looking 'app/admissions/page.tsx' form; it is mapped here, in the one
    place every data file is resolved, when the file is not at the plain path."""
    path = os.path.join(FRONTEND_ROOT, relative_path)
    if relative_path.startswith("app/") and not os.path.exists(path):
        grouped = os.path.join(FRONTEND_ROOT, "app", "(frontend)", relative_path[len("app/"):])
        if os.path.exists(grouped):
            return grouped
    return path


def read_text(relative_path: str, feature: str = "") -> Optional[str]:
    """Reads one frontend source file used as a chatbot data source. Never
    raises — returns None on any failure (missing file, permissions, bad
    encoding), logging once per path so a missing file is visible in the logs
    instead of only manifesting as a silently degraded answer at request time."""
    abs_path = resolve(relative_path)
    try:
        with open(abs_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        if abs_path not in _missing_logged:
            _missing_logged.add(abs_path)
            suffix = f" — {feature} will be unavailable/degraded." if feature else ""
            logger.error(
                f"Could not read frontend data file '{relative_path}' "
                f"(resolved to '{abs_path}'): {e}.{suffix} "
                f"Set the FRONTEND_ROOT environment variable if the frontend repository "
                f"isn't at the default location (the parent directory of chatbot/)."
            )
        return None


# ─── Known data sources — used for one consolidated startup check ──────────
# (relative_path, feature it powers). Read lazily by website_content.py's
# per-topic extractors and administration_directory.py's contact-card lookups
# (not pre-loaded), so this list exists purely to validate presence up front —
# it doesn't change how/when each file is actually read.
REQUIRED_DATA_FILES = [
    ("lib/faculty.ts", "Faculty search/lookup (indexes/faculty_index.py)"),
    ("lib/syllabus-data.ts", "Syllabus lookup (indexes/syllabus_index.py)"),
    ("lib/departments.ts", "Department descriptive fallback (indexes/department_index.py)"),
    ("lib/dept-data.ts", "Department descriptive fallback + Labs directory (indexes/department_index.py, labs_directory.py)"),
    ("lib/placements.ts", "Placement fast facts + website summary (indexes/placement_index.py, website_content.py)"),
    ("lib/transport-routes.ts", "Transport/bus route lookup (indexes/campus_index.py)"),
    ("lib/research.ts", "Research page summaries (website_content.py)"),
    ("lib/info-pages.ts", "Website content summaries + administrator contacts (website_content.py, administration_directory.py)"),
    ("app/admissions/fees/page.tsx", "Admissions fees summary (website_content.py)"),
    ("app/admissions/why-mlrit/page.tsx", "Why MLRIT summary (website_content.py)"),
    ("app/admissions/page.tsx", "Admissions overview summary (website_content.py)"),
    ("app/examinations/page.tsx", "Examinations overview summary (website_content.py)"),
    ("app/iqac/page.tsx", "IQAC summary (website_content.py)"),
    ("app/examinations/regulations/page.tsx", "Regulations summary (website_content.py)"),
    ("app/examinations/support/page.tsx", "Controller of Examinations contact (administration_directory.py)"),
    ("app/placements/support/page.tsx", "Placement Officer contact (administration_directory.py)"),
    ("app/admissions/support/page.tsx", "Admission Officer contact (administration_directory.py)"),
    ("app/iqac/support/page.tsx", "IQAC Coordinator contact (administration_directory.py)"),
]


def validate_data_files() -> None:
    """Logs one consolidated startup report of any known frontend data file
    that's missing under FRONTEND_ROOT, naming both the file and the feature
    it powers. Call once at application startup."""
    missing = [(rel, feature) for rel, feature in REQUIRED_DATA_FILES if not os.path.isfile(resolve(rel))]
    if not missing:
        logger.info(
            f"data_paths: all {len(REQUIRED_DATA_FILES)} known frontend data files found "
            f"under FRONTEND_ROOT={FRONTEND_ROOT}"
        )
        return
    logger.error(
        f"data_paths: {len(missing)}/{len(REQUIRED_DATA_FILES)} frontend data files are MISSING "
        f"under FRONTEND_ROOT={FRONTEND_ROOT}. If this is a deployment where the frontend repo "
        f"isn't alongside chatbot/, set FRONTEND_ROOT to wherever its lib/ and app/ directories live."
    )
    for rel, feature in missing:
        logger.error(f"  MISSING '{rel}' -> {feature}")
