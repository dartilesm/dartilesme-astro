import { updateLinkedinProfileData } from './fetch-linkedin-profile-data';

async function prebuild() {
  console.log('Running prebuild tasks...');
  await updateLinkedinProfileData();
  console.log('Prebuild tasks completed');
}

prebuild().catch(console.error); 