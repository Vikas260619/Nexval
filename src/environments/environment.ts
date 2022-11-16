// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // endpoint: 'https://radiumapi.nexkul.com/',
  // endpoint2: 'https://attendanceapi.nexkul.com/',
  endpoint: 'https://radiumapi.nexaei.com/',
  endpoint2: 'https://attendance.nexaei.com/',
  imageBasePath: './assets/images/',
  errorMessage:
    'Unable to process your request at this moment. Please try again after some time. If issue still presist, then please contact to our 24x7 support team.',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
