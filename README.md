## Shame
Some times due to urgency you may have added some fix to your code that you are not proud of and want to remove it. Mark the shameful portion of your code as

````
// @shame This is a function that does something shameful remove it later
function getData(){
  // something shamefull
}
````
or
````
// @shame::3.6 you can specify weight to each shame
function getData(){
  // something shameful
}
````
when shame accumulates in your code more than your **shame factor** this package will not let you build

in your package.json you can specify

````
 'build': 'shame --t 6 && **your build code**
````

## Things to do

- [x] publish as npm package
- [x] Assign weights to shame
- [ ] Ability find changes in **shame entropy** between two commits
- [ ] .. awesome ideas are welcomed ..
