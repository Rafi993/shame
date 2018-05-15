## Shame
Some times due to urgency you may have added some fix to your code that you are not proud of and may want to remove it. Mark the shameful portion of your code as

````
// @shame This is a function that does something shameful remove it later
function getData(){
  // something shamefull
}
````
or
````
// @shame::3.6 This is a less weighted shame
function getData(){
  // something shameful
}
````
to add weights to the shame. when shame accumulates in your code more than your **shame factor** this package will not let you
build

in your package.json or anything similar depending on your language

````
 'build': 'shame --t 6 && **your build code**
````

to use as cli do

````
npm i -g shame
````

In your project directory,
````
shame -t 6
````
will set a shame threshold of 6
and
````
shame -w 10
````
will set the total weights of the shame to 10

## NOTE:
It is preferable to add .gitignore to prevent shame from reading node_modules or other libs

## Things to do

- [x] publish as npm package
- [x] Assign weights to shame
- [ ] Ability find changes in **shame entropy** between two commits
- [ ] .. awesome ideas are welcomed ..
