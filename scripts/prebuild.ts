import { updateRecommendations } from './fetch-recommendations';

async function prebuild() {
  console.log('Running prebuild tasks...');
  await updateRecommendations();
  console.log('Prebuild tasks completed');
}

prebuild().catch(console.error); 