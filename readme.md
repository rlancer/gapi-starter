Google Login & API + ReactJS + Flow + Webpack starter kit
=========================================================

Google API's are great but they were designed before the module partner of Javascript programing became popular.
This starter fixes that handing Google login and library loading for you.

#Get the Code!

    git clone https://github.com/rlancer/gapi-starter.git
    cd gapi-starter
    npm install


#Add in your Project's Settings

Create a file titled **app_settings.json** in the root directory.

```JSON
{
  "client_id": "Your apps client ID from the Google API console",
  "libraries": [
    {
      "name": "compute",
      "version": "v1"
    },
    {
      "name": "drive",
      "version": "v2"
    },
    {
      "name": "gmail",
      "version": "v1"
    },
    {
      "name": "calendar",
      "version": "v3"
    },
    {
          "name": "all the other libs you wont to work with",
          "version": "v3"
        }

  ],
  "scopes": [
    "profile scope added automatically",
    "https://www.googleapis.com/auth/compute.readonly",
    "https://www.googleapis.com/auth/compute",
    "https://www.googleapis.com/auth/cloud-platform"
  ]
}
```


#Run the Webpack Dev Server

    webpack-dev-server --progress --colors --port 9030

#Ensure that the Javascript Origin is Set

In the [Google API Console](https://console.developers.google.com)

Under Credentials, make sure that the project has the proper Javascript origin set for both production and development.
