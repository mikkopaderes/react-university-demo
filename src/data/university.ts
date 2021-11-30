export default interface UniversityData {
  name: string;
  country: string;
  alpha_two_code: string;
  web_pages: string[];
  [key: string]: unknown;
}
