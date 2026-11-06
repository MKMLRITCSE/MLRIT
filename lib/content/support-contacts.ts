/**
 * Single source of truth for the heads/key contacts shown in the Support
 * section of the Admissions pages. Spellings, designations, phone numbers and
 * email addresses are kept exactly as supplied by the institution — do not
 * normalise names or reformat the numbers here.
 */
export type SupportContact = {
  sno: number;
  name: string;
  role: string;
  phone: string;
  /** null means no email address has been published — render "Not provided". */
  email: string | null;
};

export const SUPPORT_CONTACTS: SupportContact[] = [
  { sno: 1,  name: 'Dr.V.Radhika Devi',          role: 'Director',                   phone: '9160404636', email: 'director@mlrinstitutions.ac.in' },
  { sno: 2,  name: 'Dr. S.V.S Prasad',           role: 'Principal',                  phone: '9160404638', email: 'principal@mlrinstitutions.ac.in' },
  { sno: 3,  name: 'Dr. CH Achi Reddy',          role: 'HOD – H&S',                  phone: '9866652122', email: 'hodhs@mlrinstitutions.ac.in' },
  { sno: 4,  name: 'Mr. Sai Kumar',              role: 'I/C HOD – Aeronautical',     phone: '7893974728', email: 'aerohod@mlrinstitutions.ac.in' },
  { sno: 5,  name: 'Dr. Ajmeera Kiran',          role: 'HOD – CSE',                  phone: '9704545364', email: 'hodcse@mlrinstitutions.ac.in' },
  { sno: 6,  name: 'Dr. V Thrimurthulu',         role: 'HOD – ECE',                  phone: '9391018167', email: 'hodece@mlrinstitutions.ac.in' },
  { sno: 7,  name: 'Dr. Kashi Sai Prasad',       role: 'HOD – CSE (AIML)',           phone: '9505995544', email: 'hodaiml@mlrinstitutions.ac.in' },
  { sno: 8,  name: 'Dr DBK Kamesh',              role: 'HOD – CSIT',                 phone: '7989412613', email: 'hodcsit@mlrinstitutions.ac.in' },
  { sno: 9,  name: 'Prof. M. Venkateshwar Reddy', role: 'HOD – Mechanical',          phone: '9490019934', email: 'hodmech@mlrinstitutions.ac.in' },
  { sno: 10, name: 'Prof. Ashok Kumar',          role: 'HOD – EEE',                  phone: '9949071358', email: 'hodeee@mlrinstitutions.ac.in' },
  { sno: 11, name: 'Dr. P Subhashini',           role: 'HOD – CSE (DS/CS)',          phone: '7680995513', email: 'hodds@mlrinstitutions.ac.in' },
  { sno: 12, name: 'Dr. N. Ramanjaneyulu',       role: 'HOD – MBA',                  phone: '9491363735', email: 'hodmba@mlrinstitutions.ac.in' },
  { sno: 13, name: 'Mr.G.Prabhakar Reddy',       role: 'Controller of Examinations', phone: '9100963025', email: 'coe@mlrinstitutions.ac.in' },
  { sno: 14, name: 'Mr. P Ravi Chandra',         role: 'Head – Placements',          phone: '9849991299', email: 'ravichandra@mlrinstitutions.ac.in' },
  { sno: 15, name: 'Mr.S.Arun Kumar',            role: 'Asst. TPO',                  phone: '9866193405', email: 'placements@mlrinstitutions.ac.in' },
  { sno: 16, name: 'D. Sandeep',                 role: 'I/C CRT',                    phone: '8501024915', email: 'placements@mlrinstitutions.ac.in' },
  { sno: 17, name: 'Mr.A.Koti Reddy',            role: 'Head- Library',              phone: '9440653380', email: 'librarian@mlrinstitutions.ac.in' },
  { sno: 18, name: 'Dr.Y.Raghunatha Rao',        role: 'PRO',                        phone: '9652556888', email: 'yraghunath1@gmail.com' },
  { sno: 19, name: 'Dr. CH Achireddy',           role: 'Admissions I/C',             phone: '9866652122', email: 'admissions@mlrinstitutions.ac.in' },
  { sno: 20, name: 'Mr K. Narasimhulu',          role: 'Accounts Officer',           phone: '9491199042', email: 'accounts@mlrinstitutions.ac.in' },
  { sno: 21, name: 'Mr.M.Ganesh',                role: 'Administrative Officer',     phone: '9866392008', email: 'sao@mlrinstitutions.ac.in' },
  { sno: 22, name: 'Mr. J Pradeep',              role: 'Transport I/C',              phone: '9703995722', email: 'transport@mlrit.ac.in' },
  { sno: 23, name: 'Mr.B Vishnu Prasad',         role: 'Admin Office',               phone: '8367774817', email: 'admin.mlrit@mlrinstitutions.ac.in' },
  { sno: 24, name: 'Mr. Ravi',                   role: 'Scholarship Incharge',       phone: '9177080807', email: 'scholarship@mlrinstitutions.ac.in' },
  { sno: 25, name: 'Mr. K Vijay',                role: 'Network Incharge',           phone: '9849786887', email: 'vijay.tirumani@gmail.com' },
  { sno: 26, name: 'Dr. Ram Babu',               role: 'Hostel Incharge',            phone: '9492450009', email: 'mlrinfra@mlrit.ac.in' },
  { sno: 27, name: 'Mr. Sardar Inderpal Singh',  role: 'Sports Head',                phone: '9963631616', email: null },
];
