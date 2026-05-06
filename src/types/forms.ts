export interface FreelancerPayload {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Country: string;
  Departments: string[];
  Main_Software: string;
  Years_Experience: number;
  Expected_Rate_USD: number;
  Availability: string;
  Reel_Link: string;
  Reel_Password?: string;
  Portfolio_URL?: string;
  Website_URL?: string;
  Source: string;
  Message?: string;
}

export interface BusinessPayload {
  Full_Name: string;
  Work_Email: string;
  Company: string;
  Role: string;
  Country: string;
  Inquiry_Type: 'Specific project' | 'General inquiry';
  Project_Category?: string;
  Industry?: string;
  Budget_USD?: string;
  Target_Deadline?: string;
  Start_Date?: string;
  Message_And_Links: string;
  External_Links?: string;
  NDA_Requested: boolean;
}
