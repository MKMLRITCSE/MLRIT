import type { Metadata } from 'next';
import { getSection } from '@/lib/content/client';
import { asText } from '@/lib/content/sections';
import ExaminationsHero from '@/components/ExaminationsHero';
import ExaminationsQuickNav from '@/components/ExaminationsQuickNav';
import DocActions from '@/components/examinations/DocActions';
import Reveal, { Stagger, StaggerItem } from '@/components/motion/Reveal';
import SideQuickNav from '@/components/SideQuickNav';

export const metadata: Metadata = {
  title: 'Circulars — Examinations — MLRIT',
  description: 'Official examination circulars published by the Controller of Examinations at MLRIT.',
};

type Circular = {
  title: string;
  file: string;
  href?: string;
  category: 'Timetable' | 'Fee' | 'Results' | 'Notice' | 'Condonation';
  date: string;
};

const CIRCULARS: Circular[] = [
  // ── November 2026 ───────────────────────────────────────────────────────────
  {
    title: 'Postponement and Reschedule of IV-I B.Tech MID-II Examinations Scheduled on 05-11-2026 to 07-11-2026',
    file: 'Postponement-and-Reschedule-of-IV-I-B.Tech-MID-II-Examinations-Scheduled-on-05-11-2026-to-07-11-2026.pdf',
    category: 'Notice',
    date: 'November 4, 2026',
  },
  // ── October 2026 ────────────────────────────────────────────────────────────
  {
    title: 'I B.Tech I Sem Regular/Supply and I B.Tech II Sem Supply Examinations December 2026 Fee Notification',
    file: 'I-B.Tech-I-Sem.-Regular-and-Supply-and-I-B.Tech.-II-Sem.-Supply-Examinations-December-2026-Fee-Notification.pdf',
    category: 'Fee',
    date: 'October 29, 2026',
  },
  {
    title: 'IV B.Tech I Sem - Practical Regular Examinations November 2026 Timetable',
    file: 'IV-B.Tech.-I-Sem.-Practical-Regular-Examinations-November-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'III B.Tech I Sem - Practical Regular Examinations November 2026 Timetable',
    file: 'III-B.Tech.-I-Sem.-Practical-Regular-Examinations-November-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'II B.Tech I Sem - Practical Regular Examinations November 2026 Timetable',
    file: 'II-B.Tech.-I-Sem.-Practical-Regular-Examinations-November-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'III B.Tech II Sem - Supply Examinations November 2026 Timetable',
    file: 'III-B.Tech-II-Sem-Supply-Examinations-TImeTable-November2026.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'II B.Tech II Sem - Supply Examinations November 2026 Timetable',
    file: 'II-B.Tech-II-Sem-Supply-Examinations-TImeTable-November2026.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'IV B.Tech I Sem - Regular and Supply Examinations November/December 2026 Timetable',
    file: 'IV-B.Tech-I-Sem-Regular-and-Supply-Examinations-November-or-December-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'III B.Tech I Sem - Regular and Supply Examinations November 2026 Timetable',
    file: 'III-B.Tech-I-Sem-Regular,Supply-Examinations-TImeTable-November2026.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'II B.Tech I Sem - Regular and Supply Examinations November 2026 Timetable',
    file: 'II-B.Tech-I-Sem-Regular,Supply-Examinations-TImeTable-November2026.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'JNTUH One-Time-Chance Project - Permission for Late Submission Proceedings',
    file: 'OTC project - permission for late submission proceeding.pdf',
    category: 'Notice',
    date: 'October 27, 2026',
  },
  {
    title: 'Ph.D. Course Work CIE-I Examinations November 2026 Timetable',
    file: 'Ph.D-Course-Work-CIE-I-Examinations-November-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'I M.Tech I Sem R25 CIE-I Examinations November 2026 Timetable',
    file: 'I-M.Tech.-I-Sem.-R25-CIE-I-Examinations-November-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'II MBA I Sem R25 CIE-I Examinations November 2026 Timetable',
    file: 'II-MBA-I-Semester-R25-CIE-I-Examinations-November-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'I MBA I Sem R25 CIE-I Examinations November 2026 Timetable',
    file: 'I-MBA-I-Semester-R25-CIE-I-Examinations-November-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'IV B.Tech I Sem R22 CIE-II Examinations November 2026 Timetable',
    file: 'IV-B.Tech.-I-Semester-R22-CIE-II-Examinations-November-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'III B.Tech I Sem R22 CIE-II Examinations November 2026 Timetable',
    file: 'III-B.Tech.-I-Semester-R22-CIE-II-Examinations-November-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'II B.Tech I Sem R22 CIE-II Examinations November 2026 Timetable (Re-Registered Students)',
    file: 'II-B.Tech.-I-Semester-R22-CIE-II-Examinations-November-2026-Timetable-For-Re-Registered-Students.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'II B.Tech I Sem R25 CIE-II Examinations November 2026 Timetable',
    file: 'II-B.Tech.-I-Semester-R25-CIE-II-Examinations-November-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'October 27, 2026',
  },
  {
    title: 'II, III & IV B.Tech I Sem Regular/Supplementary and II & III B.Tech II Sem Supplementary Examinations November 2026 Fee Notification',
    file: 'II-III-and-IV-B.Tech.-I-Sem.-Regular-or-Supplementary-and-II-and-III-B.Tech.-II-Sem.-Supplementary-Examinations-November-2026-Fee-Notification.pdf',
    category: 'Fee',
    date: 'October 27, 2026',
  },
  // ── September 2026 ──────────────────────────────────────────────────────────
  {
    title: 'II M.Tech I Semester R25 — MID-I Examinations October 2026 Timetable',
    file: 'II-M.Tech.-I-Sem.-R25-MID-I-Examinations-October-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'September 30, 2026',
  },
  {
    title: 'II, III & IV B.Tech I Sem — Verify CIE-I Marks in Autonomous Portal (Last Date: 30-09-2026)',
    file: 'II-III-and-IV-B.TECH-I-SEM-Students-are-Verify-your-CIE-I-Marks-in-Autonomous-Portal-Last-Date-for-Verification-is-30-09-202.pdf',
    category: 'Notice',
    date: 'September 26, 2026',
  },
  {
    title: 'I B.Tech 2026-27 Admitted Students - Data Verification',
    file: 'I-B.Tech.-Students-Data-Verification.pdf',
    category: 'Notice',
    date: 'September 23, 2026',
  },
  {
    title: 'I MBA and M.Tech Regular/Supply and II M.Tech II Sem/Pre-Ph.D. Course Work Regular Examinations August 2026 Results and Revaluation',
    file: 'I-MBA-and-M.Tech.-II-and-I-Regular-and-Supply-II-M.Tech.-II-Sem.-Regular-and-Supply-PrePhd-Coursework-Regular-Examinations-August-2026-Results-Declaration-and-Revaluation.pdf',
    category: 'Results',
    date: 'September 22, 2026',
  },
  {
    title: 'I B.Tech I Semester R22 — MID-I Examinations October 2026 Timetable (Re-Registered Students)',
    file: 'I-B.Tech.-I-Semester-R22-MID-I-Examinations-October-2026-Timetable-For-Re-Registered-Students.pdf',
    category: 'Timetable',
    date: 'September 18, 2026',
  },
  {
    title: 'I B.Tech I Semester R25 — MID-I Examinations October 2026 Timetable',
    file: 'I-B.Tech.-I-Semester-R25-MID-I-Examinations-October-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'September 18, 2026',
  },
  {
    title: 'Collection of Provisional Certificate and Consolidated Grade Memo - B.Tech 2022 and MBA 2022, 2023 and 2024 Batches',
    file: 'Collection-of-Provisional-Certificate-and-Consolidated-Grade-Memo-for-B.Tech-2022-Batch-and-MBA-2022-2023-and-2024-batch-Students.pdf',
    category: 'Notice',
    date: 'September 12, 2026',
  },
  {
    title: 'Students Reporting Time and Prohibition of Electronic Gadgets During Examinations - Strict Compliance',
    file: 'Students-Reporting-Time-and-Prohibition-of-Electronic-Gadgets-During-Examinations–Strict-Compliance.pdf',
    category: 'Notice',
    date: 'September 9, 2026',
  },
  {
    title: 'Collection of Provisional Certificate and Consolidated Grade Memo - B.Tech 2018, 2020, 2021 and 2022 Batches',
    file: 'Collection-of-Provisional-Certificate-and-Consolidated-Grade-Memo-for-B.Tech-2018-2020-2021-and–2022-Batch--Students.pdf',
    category: 'Notice',
    date: 'September 1, 2026',
  },
  {
    title: 'Postponement & Reschedule of IV & I B.Tech MID-I Examinations — 02-09-2026 Rescheduled to 08-09-2026 (ECE, EEE & CSM Branches)',
    file: 'Postponement-and-Reschedule-of-IV-I-B.Tech-MID-I-Examinations-Scheduled-on-02-09-2026-Afternoon-to-08-09-2026-Afternoon-for-ECE-EEE-and-CSM-Branches.pdf',
    category: 'Notice',
    date: 'September 1, 2026',
  },
  // ── August 2026 ────────────────────────────────────────────────────────────
  {
    title: 'I B.Tech II Sem, I B.Tech I Sem and IV B.Tech II Sem June/July 2026 Examinations - Revaluation Results and Challenge Valuation',
    file: 'I-B.Tech.-II-Sem.-Regular-Supply-and-I-B.Tech.-I-Sem.-Supply-and-IV-B.Tech.-II-Sem.-Advanced-Supply-Examinations-June-or-July-2026-Revaluation-Results-and-Opportunity-Challenge-Valuation.pdf',
    category: 'Results',
    date: 'August 27, 2026',
  },
  {
    title: 'Revised II B.Tech I Sem R22 Regulation CIE-I Examinations August 2026 Timetable (Re-Registered Students)',
    file: 'Revised-II-B.Tech.-I-Semester-R22-Regulation-CIE-I-Examinations-August-2026-Timetable-for-Re-Registered-Students.pdf',
    category: 'Timetable',
    date: 'August 24, 2026',
  },
  {
    title: 'II, III & IV B.Tech I Sem R22 - Extension of Re-Registration for Internal Failed Subjects',
    file: 'Extension-of-Last-Date-for-Re-Registration-of Internal-Failed-Subjects-of-II-III-and-IV-B.Tech.-I-Sem.-R22-Regulations.pdf',
    category: 'Notice',
    date: 'August 22, 2026',
  },
  {
    title: 'I B.Tech I Sem R22 - Re-Registration for Internal Failed Subjects',
    file: 'I-B.Tech.-I-Semester-R22-Regulations-Re-Registration-for-Internal-Failed-Subjects.pdf',
    category: 'Notice',
    date: 'August 22, 2026',
  },
  {
    title: 'I MBA II Sem R25 Regulation CBT Examinations August 2026 Timetable',
    file: 'I-MBA-II-Semester-R25-Regulation-CBT-Examinations-August-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'August 22, 2026',
  },
  {
    title: 'Postponement and Reschedule of IV B.Tech I Sem MID-I and II B.Tech I Sem MID-I Examinations',
    file: 'Postponement-and-Reschedule-of-IV-B.Tech-I-Sem-MID-I-and-II-B.Tech-I-Sem-MID-I-Exam-Schedule-August-2026.pdf',
    category: 'Notice',
    date: 'August 22, 2026',
  },
  {
    title: 'Autonomous MBA R22 - Opportunity Awarding of Grace Marks (Last Date: 24-08-2026)',
    file: 'Autonomous-MBA-R22-Regulation-Opportunity-Awarding-of-Grace-Marks-and-Last-Date-for-Submission-is-24-08-2026.pdf',
    category: 'Condonation',
    date: 'August 20, 2026',
  },
  {
    title: 'II MBA and M.Tech July 2026 Examinations - Results and Revaluation Notification',
    file: 'II-MBA-I-and-II-Sem.-Regular-and-Supply-II-M.Tech.-I-Sem.-Supply-Examinations-July-2026-Results-Declaration-and-Revaluation-Notification-and-Last-Date-for-Revaluation-is-22-08-2026.pdf',
    category: 'Results',
    date: 'August 19, 2026',
  },
  {
    title: 'Autonomous Examinations - Opportunity Awarding of Grace Marks (Last Date: 25-08-2026)',
    file: 'Autonomous-Opportunity-Awarding-of-Grace-Marks-and-Last-Date-for-Submission-is-25-08-2026.pdf',
    category: 'Condonation',
    date: 'August 19, 2026',
  },
  {
    title: 'Collection of Grade Memo',
    file: 'collection-of-grade-memo.pdf',
    category: 'Notice',
    date: 'August 18, 2026',
  },
  {
    title: 'II B.Tech I Sem R25 CIE-I Examinations August 2026 - Substitute Subjects for Readmitted Students',
    file: 'II-B.Tech-I-Sem-R25-CIE-I-Examinations-August-2026-for-Substitute-Subjects-of-Readmitted-Students-Timetable.pdf',
    category: 'Timetable',
    date: 'August 13, 2026',
  },
  {
    title: 'II B.Tech I Sem R22 Regulation CIE-I Examinations August 2026 Timetable (Re-Registered Students)',
    file: 'II-B.Tech.-I-Semester-R22-Regulation-CIE-I-Examinations-August-2026-Timetable-for-Re-Registered-Students.pdf',
    category: 'Timetable',
    date: 'August 13, 2026',
  },
  {
    title: 'III B.Tech I Sem R22 CIE-I Examinations August 2026 - Substitute Subjects for Readmitted Students',
    file: 'III-B.Tech-I-Sem-R22-CIE-I-Examinations-August-2026-for-Substitute-Subjects-of-Readmitted-Students-Timetable.pdf',
    category: 'Timetable',
    date: 'August 13, 2026',
  },
  {
    title: 'I, II, III & IV B.Tech I Sem R22 - Re-Registration for Internal Failed Subjects',
    file: 'B.Tech I Sem Re-Registration R22 Regulation.pdf',
    category: 'Notice',
    date: 'August 11, 2026',
  },
  {
    title: 'I MBA II Sem R25 Regular CBT Examinations August 2026 Fee Notification',
    file: 'I-MBA-II-Semester-R25-Regular-CBT-Examinations-August-2026-Fee-Notification.pdf',
    category: 'Fee',
    date: 'August 11, 2026',
  },
  {
    title: 'II B.Tech II and I Sem Regular/Supply Examinations June 2026 - Revaluation Results and Challenge Valuation',
    file: 'II-B.Tech.-II-and-I-Sem-Regular-and-Supply-Examinations-June-2026-Revaluation-Results-and-Opportunity-Challenge-Valuation.pdf',
    category: 'Results',
    date: 'August 8, 2026',
  },
  {
    title: 'I M.Tech and MBA II Sem - Verify CIE-II and Final Internal Marks (Last Date: 13-08-2026)',
    file: 'I-M.Tech.-and-MBA-II-SEM-Students-are-Verify-your-CIE-II-and-Final-Internal-Marks-in-Autonomous-Portal-Last-Date-for-Verification-is-13-08-2026.pdf',
    category: 'Notice',
    date: 'August 7, 2026',
  },
  {
    title: 'II B.Tech I Sem R22 CIE-I Examinations August 2026 Timetable',
    file: 'II-B.Tech.-I-Sem-R22-CIE-I-Examinations-August-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'August 6, 2026',
  },
  {
    title: 'III B.Tech I Sem R22 CIE-I Examinations August 2026 Timetable',
    file: 'III-B.Tech.-I-Sem-R22-CIE-I-Examinations-August-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'August 6, 2026',
  },
  {
    title: 'IV B.Tech I Sem R22 CIE-I Examinations August 2026 Timetable',
    file: 'IV-B.Tech.-I-Sem-R22-CIE-I-Examinations-August-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'August 6, 2026',
  },
  {
    title: 'I MBA II Sem R25 Condonation Fee Circular (Last Date: 08-08-2026)',
    file: 'I MBA II SEM R25 CONDONATION CIRCULAR.pdf',
    category: 'Condonation',
    date: 'August 6, 2026',
  },
  {
    title: 'I M.Tech II Sem R25 Practical Regular Examinations August 2026 Timetable',
    file: 'I-M.Tech.-II-Sem.-R25-Practical-Regular-Examinations-August-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'August 6, 2026',
  },
  {
    title: 'I MBA I Sem R25 Practical Supply Examinations August 2026 Timetable',
    file: 'I-MBA-I-Sem.-R25-Practical-Supply-Examinations-August-2026-Timetable.pdf',
    category: 'Timetable',
    date: 'August 6, 2026',
  },
  {
    title: 'I B.Tech II Sem, I B.Tech I Sem Supply and IV B.Tech II Sem Advanced Supply June/July 2026 Examinations - Results and Revaluation Notification',
    file: 'I-B.Tech.-II-Sem.-Regular-Supply-and-I-B.Tech.-I-Sem.-Supply-and-IV-B.Tech.-II-Sem.-Advanced-Supply-Examinations-June-or-July-2026-Results-Declaration-and-Revaluation-Notification-and-Last-Date-for-Revaluation.pdf',
    category: 'Results',
    date: 'August 5, 2026',
  },
  {
    title: 'B.Tech, M.Tech and MBA - Readmission Circular',
    file: 'B.Tech.-M.Tech.-and-MBA-Readmission-Circular.pdf',
    category: 'Notice',
    date: 'August 1, 2026',
  },
  {
    title: 'B.Tech, M.Tech and MBA - Student Data Verification and Correction (Last Date: 14-08-2026)',
    file: 'B.Tech.-M.Tech.-and-MBA-Students-Data-Verification-and-Correction-Last-Date-for-Correction-is-14-08-2026.pdf',
    category: 'Notice',
    date: 'August 1, 2026',
  },
  {
    title: 'Duration of B.Tech, M.Tech and MBA Programmes',
    file: 'Duration-of-B.Tech.-M.Tech.-and-MBA-Programmes.pdf',
    category: 'Notice',
    date: 'August 1, 2026',
  },
  {
    title: 'II M.Tech II Sem Regular/Supplementary Project Viva-Voce Examinations August 2026 Fee Notification',
    file: 'II-M.Tech-II-Sem-Regular-and-Supple-Project-Viva-Voce-Examinations-August-2026-Fee-Notification.pdf',
    category: 'Fee',
    date: 'August 1, 2026',
  },
  // ── July 2026 ───────────────────────────────────────────────────────────────
  {
    title: 'I B.Tech II SEM — Verify CBT Marks in Autonomous Portal (Last Date: 25-07-2026)',
    file: 'I-B.Tech.-II-SEM-Students-are-Verify-your-CBT-Marks-in-Autonomous-Portal-Last-Date-for-Verification-is-25-07-2026.pdf',
    category: 'Notice',
    date: 'July 2026',
  },
  {
    title: 'II B.Tech II Sem Regular / Supply & II B.Tech I Sem Supply — June 2026 Results & Revaluation (Last Date: 25-07-2026)',
    file: 'II-B.Tech.-II-Sem.-Regular-Supply-and-II-B.Tech.-I-Sem.-Supply-Examinations-June-2026-Results-Declaration-and-Revaluation-and-Last-Date-for-Revaluation-is-25-07-2026.pdf',
    category: 'Results',
    date: 'July 2026',
  },
  {
    title: 'Issue of Provisional Certificate and Consolidated Grade Memo — B.Tech 2022–26 Batch',
    file: 'Issue-of-Provisional-Certificate-and-Consolidated-Grade-Memo-for-B.Tech-2022-26-Batch-Students.pdf',
    category: 'Notice',
    date: 'July 2026',
  },
  {
    title: 'I B.Tech II Semester R25 — Regular CBT Examinations July 2026 Fee Notification',
    file: 'I-B.Tech-II-Semester-R25-Regulations-Regular-CBT-Examinations-July-2026-Fee-Notification.pdf',
    category: 'Fee',
    date: 'July 2026',
  },
  {
    title: 'MBA Special Supplementary OTC End Semester Examinations July–August 2026',
    file: 'FINAL-TIMETABLE-MBA-OTC-2026.pdf',
    href: '/examinations/timetables/FINAL-TIMETABLE-MBA-OTC-2026.pdf',
    category: 'Timetable',
    date: 'July 2026',
  },
  {
    title: 'B.Tech Special Supplementary OTC End Semester Examinations July–August 2026',
    file: 'FINAL-TIMETABLE-BTECH-OTC-2026.pdf',
    href: '/examinations/timetables/FINAL-TIMETABLE-BTECH-OTC-2026.pdf',
    category: 'Timetable',
    date: 'July 2026',
  },
  {
    title: 'MBA & M.Tech. August 2026 Supplementary Examinations — Fee Notification (Last Date: 06-07-2026)',
    file: 'I-MBA-and-M.Tech.-II-Semester-Regular-and-Supplementary-and-I-MBA-and-M.Tech.-I-Semester-Supplementary-Examinations-August-2026-Fee-Notification-and-Last-Date-for-Fee-Payment-without-Late-Fee-is-06-07-2026.pdf',
    category: 'Fee',
    date: 'July 2026',
  },
  {
    title: 'II MBA II Sem. Regular & Supply and II MBA I Sem. Supply — July 2026 Fee Notification',
    file: 'II-MBA-II-Sem.-Regular-and-Supply-and-II-MBA-I-Sem.-Supply-Examinations-July-2026-Fee-Notification.pdf',
    category: 'Fee',
    date: 'July 2026',
  },
  {
    title: 'II M.Tech. I Sem. Supply Examinations July 2026 — Fee Notification',
    file: 'II-M.Tech.-I-Sem.-Supply-Examinations-July-2026-Fee-Notification.pdf',
    category: 'Fee',
    date: 'July 2026',
  },
  {
    title: 'JNTUH B.Tech, M.Tech & MBA Special Supplementary OTC — June/July 2026 Fee Notification',
    file: 'JNTUH-B.Tech.-M.Tech.-and-MBA-Special-Supplementary-One-Time-Chance-Examinations-June-July-2026-Fee-Notification.pdf',
    category: 'Fee',
    date: 'June 2026',
  },
  {
    title: 'I B.Tech II Sem. Regular & Supply and I B.Tech I Sem. Supply — June 2026 Fee Notification',
    file: 'I-B.Tech-II-Sem.-Regular-and-Supply-and-I-B.Tech.-I-Sem.-Supply-Examinations-June-2026-Fee-Notification.pdf',
    category: 'Fee',
    date: 'June 2026',
  },
  {
    title: 'I B.Tech II SEM — Verify CIE II and Final Internal Marks (Last Date: 25-06-2026)',
    file: 'I-B.Tech.-II-SEM-Students-are-Verify-your-CIE-II-and-Final-Internal-Marks-in-Autonomous-Portal-Last-Date-for-Verification-is-25-06-2026.pdf',
    category: 'Notice',
    date: 'June 2026',
  },
  {
    title: 'IV B.Tech II Semester — Advance Supplementary Examinations June 2026 Fee Notification (Last Date: 24-05-2026)',
    file: 'IV-B.Tech.-II-Semester-Advance-Supplementary-Examinations-June-2026-Fee-Notification-and-Last-Date-Without-Late-Fee-is-24-05-2026.pdf',
    category: 'Fee',
    date: 'May 2026',
  },
  {
    title: 'Autonomous I B.Tech II Sem — Condonation Fee Circular (Last Date: 11-06-2026)',
    file: 'Autonomous-I-B.Tech.-II-Sem.-Condonation-Fee-Circular.-Last-Date-For-Payment-Of-Condonation-Fee-is-11-06-2026-Through-Online.pdf',
    category: 'Condonation',
    date: 'June 2026',
  },
  {
    title: 'III & IV B.Tech I & II Sem — Regular & Supply April 2026 Revaluation Results & Challenge Valuation',
    file: 'III-and-IV-B.Tech.-I-and-II-Sem-Regular-and-Supply-Examinations-April-2026-Revaluation-Results-and-Opportunity-Challenge-Valuation.pdf',
    category: 'Results',
    date: 'April 2026',
  },
  {
    title: 'III & IV B.Tech II SEM — Verify CIE II and Final Internal Marks (Last Date: 21-04-2026)',
    file: 'III-and-IV-B.Tech.-II-SEM-Students-are-Verify-your-CIE-II-and-Final-Internal-Marks-in-Autonomous-Portal-Last-Date-for-Verification-is-21-04-2026.pdf',
    category: 'Notice',
    date: 'April 2026',
  },
  {
    title: 'III B.Tech I & II Sem Examination April 2026 — Results Declaration and Revaluation',
    file: 'III-B.Tech-I-and-II-Sem-Examionation-April-2026-Declaration-and-Revaluation.pdf',
    category: 'Results',
    date: 'April 2026',
  },
  {
    title: 'II B.Tech II Semester — Condonation Notification (Submit by 01-05-2026)',
    file: 'II-B.Tech.-II-Semester-Condonation-Notification-Submission-of-Undertaking-and-Medical-Certificate-on-or-before-01-05-2026.pdf',
    category: 'Condonation',
    date: 'April 2026',
  },
  {
    title: 'Autonomous III & IV B.Tech II Sem — Condonation Fee Circular (Last Date: 04-04-2026)',
    file: 'Autonomous-III-and-IV-B.Tech.-II-Sem.-Condonation-Fee-Circular.-Last-Date-For-Payment-Of-Condonation-Fee-is-04-04-2026-Through-Online.pdf',
    category: 'Condonation',
    date: 'April 2026',
  },
  {
    title: 'I B.Tech II SEM — Verify CIE I Marks in Autonomous Portal (Last Date: 04-04-2026)',
    file: 'I-B.TECH-II-SEM-Students-are-Verify-your-CIE-I-Marks-in-Autonomous-Portal-Last-Date-for-Verification-is-04-04-2026.pdf',
    category: 'Notice',
    date: 'April 2026',
  },
  {
    title: 'I M.Tech & MBA I & II Semester — Feb 2026 Results Released & Revaluation Notification',
    file: 'I-M.Tech-and-MBA-I-and-II-Semester-Regular-and-Supple-Examinations-February-2026-Results-Released-Revaluation-Notification.pdf',
    category: 'Results',
    date: 'February 2026',
  },
  {
    title: 'One Time Chance Special Supply Examination Feb 2026 — Revaluation Results & Challenge Valuation',
    file: 'One-Time-chance-Special-Supply-Examination-Feb-2026-Revaluation-Results-Opportunity-Challange-Valuation-1.pdf',
    category: 'Results',
    date: 'February 2026',
  },
  {
    title: 'MBA Project Thesis Submission for Plagiarism Check',
    file: 'MBA-Project-Thesis-Submission-for-Plagiarism-Check.pdf',
    category: 'Notice',
    date: '2026',
  },
  {
    title: 'Data Corrections Reminder — B.Tech, M.Tech & MBA Students (Verification of Student Details)',
    file: 'Data-Corrections-Reminder-for-B.Tech.-M.Tech.-and-MBA-Students-Verification-of-Student-Details.pdf',
    category: 'Notice',
    date: '2026',
  },
  {
    title: 'Issue of Provisional Certificate and Consolidated Grade Memo — B.Tech',
    file: 'Issue-of-PC-and-CGM-to-the-students-of-B.Tech..pdf',
    category: 'Notice',
    date: '2026',
  },
];

const BADGE_STYLES: Record<Circular['category'], string> = {
  Timetable:   'bg-green-50 border-green-200 text-secondary',
  Fee:         'bg-orange-50 border-orange-200 text-primary',
  Results:     'bg-blue-50 border-blue-200 text-blue-700',
  Notice:      'bg-warm-light border-border text-muted',
  Condonation: 'bg-purple-50 border-purple-200 text-purple-700',
};

const NAV_ITEMS = [
  { id: 'circulars', label: 'Circulars' },
];

export const revalidate = 60;

export default async function CircularsPage() {
  const row = await getSection('examinations', 'circulars').catch(() => null);
  const c = (row?.content ?? {}) as Record<string, unknown>;
  const copy = (key: string, fallback: string) => asText(c[key], fallback);

  return (
    <>
      <ExaminationsHero
        title="COE"
        italic="Circulars."
        dek="Official circulars issued by the Controller of Examinations — examination schedules, fee notifications, mark verifications and general instructions."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Examinations', href: '/examinations/coe' },
          { label: 'Circulars' },
        ]}
      />
      <ExaminationsQuickNav active="/examinations/circulars" />

      <div className="lg:flex lg:gap-0 items-start">
        <aside className="hidden lg:block lg:w-56 shrink-0 self-start sticky top-28">
          <div className="pt-12 pl-6">
            <SideQuickNav items={NAV_ITEMS} />
          </div>
        </aside>
        <div className="flex-1 min-w-0">

      <section id="circulars" className="bg-warm-light min-h-[60vh] py-8 md:py-14">
        <div className="w-full px-4 md:px-10 lg:px-12">

          <Reveal>
            <span className="font-mono text-[0.7rem] font-bold tracking-[0.22em] uppercase text-secondary">
              {CIRCULARS.length} Circulars
            </span>
            <h2 className="mt-3 font-sans font-black tracking-tighter text-foreground text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.04]">{copy('recent', 'Recent')}<span className="font-display italic font-medium text-primary">{copy('circulars', 'circulars.')}</span>
            </h2>
          </Reveal>

          <Stagger className="mt-6 md:mt-10 space-y-3" delay={0.04} amount={0.01}>
            {CIRCULARS.map((c) => (
              <StaggerItem key={c.file}>
                <div className="bg-white rounded-2xl border border-border px-4 py-3 md:px-5 md:py-4 flex items-center gap-3 md:gap-4 hover:border-secondary/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[0.6rem] font-mono font-bold tracking-widest uppercase ${BADGE_STYLES[c.category]}`}>
                        {c.category}
                      </span>
                      <span className="font-mono text-[0.62rem] text-muted tracking-wide">{c.date}</span>
                    </div>
                    <p className="font-sans font-semibold text-foreground text-[0.88rem] leading-snug truncate" title={c.title}>
                      {c.title}
                    </p>
                  </div>
                  <DocActions
                    href={c.href ?? `/examinations/circulars/${c.file}`}
                    filename={c.file}
                    viewLabel={copy('viewLabel', 'View')}
                    downloadLabel={copy('downloadLabel', 'Download')}
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal preset="up" delay={0.2}>
            <div className="mt-6 md:mt-8 p-4 md:p-5 rounded-xl border border-border bg-white flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-secondary shrink-0 mt-0.5" aria-hidden>
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 7v5M8 5v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <p className="text-muted text-[0.85rem] leading-relaxed">
                For queries about a specific circular, contact the COE office at{' '}
                <a href="mailto:coe@mlrinstitutions.ac.in" className="text-secondary font-semibold hover:underline">{copy('coeMlrinstitutionsAcIn', 'coe@mlrinstitutions.ac.in')}</a>{' '}
                or visit the{' '}
                <a href="/examinations/contact" className="text-secondary font-semibold hover:underline">{copy('contactUs', 'Contact Us')}</a>{' '}
                page.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

        </div>
      </div>
    </>
  );
}
