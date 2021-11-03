# wh-shared-services

A repo to contain share services like fulfilment, 3PL, marketplace etc.

# Deployment ( As SubModule )

- One has to clone this repo as submodule in main repo
- Example: one would like to use this repo in oms-service(main repo) as submodule then he has to hit below command:-
  git submodule add ${git_http_url} ./src/wh-shared-services

- So this command will make one folder in src folder named wh-shared-services and all the codes of main branch will be reflected and you can use all dependencies of main repo in this folder services
- Above command will make one more file named .gitmodules to keep track of all submodules
- Once this is done then other user can hit "git clone --recurse-submodules" command to get updates of submodules once 
.gitmodules file is generated using above commands

# Contribution ( As SubModule )

- One can write common logics in wh-shared-services folder and then maintain one branch for all changes and then all changes will be pushed to that branch
- For pushing that submodule repo code to particular branch you have to be in that wh-shared-services folder and you can use all git commands there
- After pushing the code into that branch, you can take pull of that particular branch in that submodule repository (wh-shared-services repository) to maintain the latest code
- Write down any service in services folder and include it in respective folder like shopify, wordpress etc
- One can use utils folder for common methods
- One can use types folder for interfaces

# Deployment ( As Npm Package )
# Reference Link ( https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af )

- One has to link it with global node modules using "npm link" so it will be linked to global node modules
- Now one can hit command "npm link wh-shared-service" to install this repo as node modules in another repo and can use as npm package

# Contribution ( As SubModule )

- One can write down all logics in src folder
- Write down any service in services folder and include it in respective folder like shopify, wordpress etc
- One can use utils folder for common methods
- One can use types folder for interfaces
- make a build using npm build command so every functions can compile to javascript
- To send update to node modules where this package is used you can again npm link in case of changes are not reflected
