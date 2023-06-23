# deepstroy-ui


## Start
``` 
npm ci

npm start
``` 

## husky with nvm

If on commit you see this kind of error `.husky/commit-msg: line 5: npm: command not found` and you are using nvm you might need to create ~/.huskyrc with
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```
Source: https://stackoverflow.com/questions/67063993/sh-husky-command-not-found
