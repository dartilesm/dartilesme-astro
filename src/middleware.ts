import { defineMiddleware } from 'astro/middleware';

const HOST_NAME = import.meta.env.VERCEL_PROJECT_PRODUCTION_URL || "dartiles.me";

export const onRequest = defineMiddleware(async (context, next) => {
  const userAgent = context.request.headers.get('User-Agent');
  const url = context.url.toString();

  if (!userAgent?.includes('vercel') && url.includes(HOST_NAME)) {
    const data = {
      ...context.request,
      url: url,
      ip: context.clientAddress,
      user_agent: context.request.headers.get('User-Agent') || '',
      accept_language: context.request.headers.get('Accept-Language'),
      sec_ch_ua: context.request.headers.get('Sec-CH-UA'),
      sec_ch_ua_mobile: context.request.headers.get('Sec-CH-UA-Mobile'),
      sec_ch_ua_platform: context.request.headers.get('Sec-CH-UA-Platform'),
      sec_ch_ua_platform_version: context.request.headers.get('Sec-CH-UA-Platform-Version'),
      sec_ch_width: context.request.headers.get('Sec-CH-Width'),
      sec_ch_viewport_width: context.request.headers.get('Sec-CH-Viewport-Width'),
      referrer: context.request.headers.get('Referer'),
      tags: {}
    };

    console.log({
      data,
    });

    try {
      const response = await fetch(`${import.meta.env.PIRSCH_API_URL}/hit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.PIRSCH_ACCESS_KEY}`
        },
        body: JSON.stringify(data)
      });

      console.log({
        response
      });
    } catch (error) {
      console.error({
        error
      })
    }
  }

  return next();
});
