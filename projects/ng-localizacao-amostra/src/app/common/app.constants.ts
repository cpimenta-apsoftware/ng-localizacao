import { environmentVariables } from "../../utils/validateEnv"; 

export class AppConstants {    
    private static API_BASE_URL = "environmentVariables.apiBaseUrl";
    private static OAUTH2_URL = AppConstants.API_BASE_URL + "oauth2/authorization/";
    private static REDIRECT_URL = "environmentVariables.clientUrl";
    public static API_URL = AppConstants.API_BASE_URL + "api/";
    public static AUTH_API = AppConstants.API_URL + "auth/";
    public static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + "google" + AppConstants.REDIRECT_URL;
    public static FACEBOOK_AUTH_URL = AppConstants.OAUTH2_URL + "facebook" + AppConstants.REDIRECT_URL;
    public static GITHUB_AUTH_URL = AppConstants.OAUTH2_URL + "github" + AppConstants.REDIRECT_URL;
    public static LINKEDIN_AUTH_URL = AppConstants.OAUTH2_URL + "linkedin" + AppConstants.REDIRECT_URL;
    public static API_MAPBOX_TOKEN = environmentVariables.apiMapboxToken;
    public static ENVIRONMENT_NAME = environmentVariables.environmentName;
    public static PRODUCTION = environmentVariables.production;
}