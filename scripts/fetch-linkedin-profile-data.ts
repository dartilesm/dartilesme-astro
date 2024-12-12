import fs from 'fs/promises';
import path from 'path';
import Joi from "joi";

import type { LinkedInProfileData } from '@/src/types/linkedin';

const CACHE_FILE_PATH = path.join(process.cwd(), 'src/assets', 'linkedin-profile-data.json');
const ONE_YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000;

async function fetchLinkedinProfileData(): Promise<LinkedInProfileData | null> {
    if (!process.env.LINKEDIN_API_URL || !process.env.LINKEDIN_API_KEY || !process.env.LINKEDIN_API_HOST) {
        console.error('Missing LinkedIn API credentials');
        return null;
    }

    const baseUrl = process.env.LINKEDIN_API_URL!;
    const url = `${baseUrl}/all-profile-data?username=dartiles`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.LINKEDIN_API_KEY!,
            'x-rapidapi-host': process.env.LINKEDIN_API_HOST!
        }
    };

    
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!result.data) {
          console.error(result.message);
          return null;
        }
        
        // For each receivedRecommendation make a request to the LinkedIn API to get the profile picture
        result.data.receivedRecommendation = await Promise.all(
            result.data.receivedRecommendation.map(async (recommendation: LinkedInProfileData['data']['receivedRecommendation'][number]) => {
                const profileDataResponse = await fetch(
                    `${baseUrl}/all-profile-data?username=${recommendation?.recommender?.username}`,
                    options
                );
                const profileData = await profileDataResponse.json();
                console.log({ profileData });
                
                
                return {
                    ...recommendation,
                    recommender: {
                        ...recommendation.recommender,
                        profilePictures: recommendation.recommender.profilePictures.map(picture => ({
                            ...picture,
                            url: profileData?.profilePicture
                        }))
                    }
                };
            })
        );

        return {
            lastFetched: new Date().toISOString(),
            ...result
        }

    } catch (error) {
        console.error(error);

        return null
    }
}

async function readCache(): Promise<LinkedInProfileData | null> {
  try {
    const data = await fs.readFile(CACHE_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function writeCache(data: LinkedInProfileData | null) {
  try {
    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}

function validateDataStructure(data: LinkedInProfileData | null) {
  const schema = Joi.object({
    lastFetched: Joi.string().isoDate().required(),
    success: Joi.boolean().required(),
    message: Joi.string().allow(""),
    data: Joi.object({
      id: Joi.number().required(),
      urn: Joi.string().required(),
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      isCreator: Joi.boolean().required(),
      isOpenToWork: Joi.boolean().required(),
      isHiring: Joi.boolean().required(),
      profilePicture: Joi.string().uri().required(),
      backgroundImage: Joi.array().items(
        Joi.object({
          width: Joi.number().required(),
          height: Joi.number().required(),
          url: Joi.string().uri().required()
        })
      ).required(),
      summary: Joi.string().required(),
      headline: Joi.string().required(),
      geo: Joi.object({
        country: Joi.string().required(),
        city: Joi.string().required(),
        full: Joi.string().required()
      }).required(),
      languages: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          proficiency: Joi.string().required()
        })
      ).required(),
      educations: Joi.array().items(
        Joi.object({
          start: Joi.object({
            year: Joi.number().required(),
            month: Joi.number().required(),
            day: Joi.number().required()
          }).required(),
          end: Joi.object({
            year: Joi.number().required(),
            month: Joi.number().required(), 
            day: Joi.number().required()
          }).required(),
          fieldOfStudy: Joi.string().required(),
          degree: Joi.string().required(),
          grade: Joi.string().allow('').required(),
          schoolName: Joi.string().required(),
          description: Joi.string().required(),
          activities: Joi.string().required(),
          url: Joi.string().uri().required(),
          schoolId: Joi.string().required()
        })
      ).required(),
      position: Joi.array().items(
        Joi.object({
          companyId: Joi.number().required(),
          companyName: Joi.string().required(),
          companyUsername: Joi.string().allow('').required(),
          companyURL: Joi.string().uri().allow('').required(),
          companyLogo: Joi.string().uri().allow('').required(),
          companyIndustry: Joi.string().allow('').required(),
          companyStaffCountRange: Joi.string().allow('').required(),
          title: Joi.string().required(),
          multiLocaleTitle: Joi.object({
            es_ES: Joi.string().required()
          }).required(),
          multiLocaleCompanyName: Joi.object({
            es_ES: Joi.string().required()
          }).required(),
          location: Joi.string().required(),
          description: Joi.string().required(),
          employmentType: Joi.string().required(),
          start: Joi.object({
            year: Joi.number().required(),
            month: Joi.number().required(),
            day: Joi.number().required()
          }).required(),
          end: Joi.object({
            year: Joi.number().required(),
            month: Joi.number().required(),
            day: Joi.number().required()
          }).required()
        })
      ).required(),
      fullPositions: Joi.array().items(
        Joi.object({
          companyId: Joi.number().required(),
          companyName: Joi.string().required(),
          companyUsername: Joi.string().allow('').required(),
          companyURL: Joi.string().uri().allow('').required(),
          companyLogo: Joi.string().uri().allow('').required(),
          companyIndustry: Joi.string().allow('').required(),
          companyStaffCountRange: Joi.string().allow('').required(),
          title: Joi.string().required(),
          multiLocaleTitle: Joi.object({
            es_ES: Joi.string().required()
          }).required(),
          multiLocaleCompanyName: Joi.object({
            es_ES: Joi.string().required()
          }).required(),
          location: Joi.string().required(),
          description: Joi.string().required(),
          employmentType: Joi.string().required(),
          start: Joi.object({
            year: Joi.number().required(),
            month: Joi.number().required(),
            day: Joi.number().required()
          }).required(),
          end: Joi.object({
            year: Joi.number().required(),
            month: Joi.number().required(),
            day: Joi.number().required()
          }).required()
        })
      ).required(),
      skills: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          passedSkillAssessment: Joi.boolean().required(),
          endorsementsCount: Joi.number().optional()
        })
      ).required(),
      givenRecommendation: Joi.array().items(
        Joi.object({
          text: Joi.string().required(),
          created: Joi.number().required(),
          lastModified: Joi.number().required(),
          relationship: Joi.string().required(),
          recommendee: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            occupation: Joi.string().required(),
            username: Joi.string().required(),
            profilePictures: Joi.array().items(
              Joi.object({
                width: Joi.number().required(),
                height: Joi.number().required(),
                url: Joi.string().uri().required()
              })
            ).optional()
          }).required()
        })
      ).required(),
      givenRecommendationCount: Joi.number().required(),
      receivedRecommendation: Joi.array().items(
        Joi.object({
          text: Joi.string().required(),
          created: Joi.number().required(),
          lastModified: Joi.number().required(),
          relationship: Joi.string().required(),
          recommender: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            occupation: Joi.string().required(),
            username: Joi.string().required(),
            profilePictures: Joi.array().items(
              Joi.object({
                width: Joi.number().required(),
                height: Joi.number().required(),
                url: Joi.string().uri().allow("")
              })
            ).required()
          }).required()
        })
      ).required(),
      receivedRecommendationCount: Joi.number().required(),
      courses: Joi.allow(null).required(),
      certifications: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          start: Joi.object({
            year: Joi.number().required(),
            month: Joi.number().required(),
            day: Joi.number().required()
          }).required(),
          end: Joi.object({
            year: Joi.number().required(),
            month: Joi.number().required(),
            day: Joi.number().required()
          }).required(),
          authority: Joi.string().required(),
          company: Joi.object({
            name: Joi.string().required(),
            universalName: Joi.string().required(),
            logo: Joi.string().uri().required(),
            staffCountRange: Joi.object().required(),
            headquarter: Joi.object().required()
          }).required(),
          timePeriod: Joi.object({
            start: Joi.object({
              year: Joi.number().required(),
              month: Joi.number().required(),
              day: Joi.number().required()
            }).required(),
            end: Joi.object({
              year: Joi.number().required(),
              month: Joi.number().required(),
              day: Joi.number().required()
            }).required()
          }).required()
        })
      ).required(),
      honors: Joi.allow(null).required(),
      projects: Joi.object({
        total: Joi.number().required(),
        items: Joi.array().items(
          Joi.object({
            title: Joi.string().required(),
            description: Joi.string().allow('').required(),
            start: Joi.object({
              year: Joi.number().required(),
              month: Joi.number().required(),
              day: Joi.number().required()
            }).required(),
            end: Joi.object({
              year: Joi.number().required(),
              month: Joi.number().required(),
              day: Joi.number().required()
            }).required(),
            contributors: Joi.array().items(
              Joi.object({
                urn: Joi.string().required(),
                username: Joi.string().required(),
                fullName: Joi.string().required(),
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                profilePicture: Joi.array().items(
                  Joi.object({
                    width: Joi.number().required(),
                    height: Joi.number().required(),
                    url: Joi.string().uri().required()
                  })
                ).required(),
                headline: Joi.string().required(),
                url: Joi.string().uri().required()
              })
            ).required()
          })
        ).required()
      }).required(),
      volunteering: Joi.allow(null).required(),
      supportedLocales: Joi.array().items(
        Joi.object({
          country: Joi.string().required(),
          language: Joi.string().required()
        })
      ).required(),
      multiLocaleFirstName: Joi.object({
        es: Joi.string().required()
      }).required(),
      multiLocaleLastName: Joi.object({
        es: Joi.string().required()
      }).required(),
      multiLocaleHeadline: Joi.object({
        es: Joi.string().required()
      }).required()
    }).required()
  })

  const { error } = schema.validate(data);

  return !error;
}

export async function updateLinkedinProfileData() {
  try {
    const cache = await readCache();
    const now = new Date();

    // If cache exists and is less than a year old, skip update
    if (cache) {
      const lastFetched = new Date(cache.lastFetched);
      if (now.getTime() - lastFetched.getTime() < ONE_YEAR_IN_MS) {
        console.log('Cache is still valid, skipping update');
        return;
      }
    }

    // Fetch new data
    const profileData = await fetchLinkedinProfileData();

    // Validate data structure
    if (!validateDataStructure(profileData)) {
      console.error('Invalid data structure received');
      return;
    }

    await writeCache(profileData);
    console.log('Linkedin profile data cache updated successfully');
  } catch (error) {
    console.error('Error updating linkedin profile data:', error);
  }
} 