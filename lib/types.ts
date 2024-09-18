export type ScheduleType = {
  monday?: {
    start: string;
    end: string;
  };
  tuesday?: {
    start: string;
    end: string;
  };
  wednesday?: {
    start: string;
    end: string;
  };
  thursday?: {
    start: string;
    end: string;
  };
  friday?: {
    start: string;
    end: string;
  };
};

export type DecodedType = {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  sid: string;
  acr: string;
  allowed_origins: string[];
  realm_access: {
    roles: string[];
  };
  resource_access: {
    [key: string]: {
      roles: string[];
    };
  };
  scope: string;
  upn: string;
  email_verified: boolean;
  name: string;
  groups: string[];
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
};

export type Course = {
  recordKey: string;
  department: string;
  courseNumber: string;
  section: string;
  crn: string;
  title: string;
  classType: string;
  roomNumber: string | null;
  hasSecuredRoom: boolean | null;
  schedule: ScheduleType;
  semester: string;
  year: number;
  credits: number;
  label: string;
  status: string;
  instructorId: string;
  specialInfo: string | null;
  notes: string | null;
};