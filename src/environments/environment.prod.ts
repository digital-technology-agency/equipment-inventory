/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  project_name: 'ticket-system',
  authEndpoint: 'http://localhost:9000',
  authEndpoint_login: `/token`,
  authEndpoint_refresh_token: `/refresh`,
  authEndpoint_registr: `/registration`,
  authTokenKey: 'auth_app_token',
  authTokenBody: 'token',
  apiEndpoint: 'http://localhost:10000/api',
};
