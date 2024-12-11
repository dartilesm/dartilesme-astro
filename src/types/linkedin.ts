export interface LinkedInProfileData {
  lastFetched: string;
  success: boolean;
  message: string;
  data: {
    urn: string;
    username: string;
    firstName: string;
    lastName: string;
    isCreator: boolean;
    isOpenToWork: boolean;
    isHiring: boolean;
    profilePicture: string;
    backgroundImage: Array<{
      width: number;
      height: number;
      url: string;
    }>;
    summary: string;
    headline: string;
    geo: {
      country: string;
      city: string;
      full: string;
    };
    languages: Array<{
      name: string;
      proficiency: string;
    }>;
    educations: null;
    position: Array<{
      companyId: number;
      companyName: string;
      companyUsername: string;
      companyURL: string;
      companyLogo: string;
      companyIndustry: string;
      companyStaffCountRange: string;
      title: string;
      multiLocaleTitle: {
        en_US: string;
      };
      multiLocaleCompanyName: {
        en_US: string;
      };
      location: string;
      description: string;
      employmentType: string;
      start: {
        year: number;
        month: number;
        day: number;
      };
      end: {
        year: number;
        month: number;
        day: number;
      };
    }>;
    fullPositions: Array<{
      companyId: number;
      companyName: string;
      companyUsername: string;
      companyURL: string;
      companyLogo: string;
      companyIndustry: string;
      companyStaffCountRange: string;
      title: string;
      multiLocaleTitle: {
        en_US: string;
      };
      multiLocaleCompanyName: {
        en_US: string;
      };
      location: string;
      description: string;
      employmentType: string;
      start: {
        year: number;
        month: number;
        day: number;
      };
      end: {
        year: number;
        month: number;
        day: number;
      };
    }>;
    skills: Array<Record<string, unknown>>;
    givenRecommendation: Array<{
      text: string;
      created: number;
      lastModified: number;
      relationship: string;
      recommendee: Record<string, unknown>;
    }>;
    givenRecommendationCount: number;
    receivedRecommendation: Array<{
      text: string;
      created: number;
      lastModified: number;
      relationship: string;
      recommender: {
        firstName: string;
        lastName: string;
        occupation: string;
        username: string;
        profilePictures: Array<{
          width: number;
          height: number;
          url: string;
        }>;
      };
    }>;
    receivedRecommendationCount: number;
    courses: null;
    certifications: Array<{
      name: string;
      start: {
        year: number;
        month: number;
        day: number;
      };
      end: {
        year: number;
        month: number;
        day: number;
      };
      authority: string;
      company: {
        name: string;
        universalName: string;
        logo: string;
        staffCountRange: Record<string, unknown>;
        headquarter: Record<string, unknown>;
      };
      timePeriod: {
        start: {
          year: number;
          month: number;
          day: number;
        };
        end: {
          year: number;
          month: number;
          day: number;
        };
      };
    }>;
    honors: null;
    projects: {
      total: number;
      items: null;
    };
    volunteering: null;
    supportedLocales: Array<{
      country: string;
      language: string;
    }>;
    multiLocaleFirstName: {
      en: string;
    };
    multiLocaleLastName: {
      en: string;
    };
    multiLocaleHeadline: {
      en: string;
    };
  };
}
