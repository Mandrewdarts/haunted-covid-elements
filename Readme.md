# Covid-19 Elements

Custom Elements that provide Covid-19 data.

Libraries used
* https://github.com/matthewp/haunted
* https://github.com/polymer/lit-html

APIs used
* https://covidtracking.com/

## Elements
__Covid State List__

This element pulls all 50 US states and details about their tracking information. It creates a dropdown to choose a state.

### Attributes
None.

### Events
`state-selected`

This is emitted when a state is selected from the dropdown. Emitted on load of component.

### Usage
```html
<covid-state-list></covid-state-list>
```

__Covid State Details__

This element pulls data of the provided state.

### Attributes
`state`

This is the specified state. Ex. `state="CA"`

### Events
None.

### Usage

```html
<covid-state-details state="CA"></covid-state-details>
```