# pull-to-refresh2

`npm install pull-to-refresh2`
`yarn add pull-to-refresh2`

A pull to refresh component for the web based on react-hammer and material-ui.

Where you want to render the component:

`import PullToRefresh from "pull-to-refresh2"`

```xml
<PullToRefresh
  onRefresh={resolve=>{/*...*/resolve()}}// pull from top
  onMore={resolve=>{/*...*/resolve()}} //pull from bottom
  label=""//pull from bottom
  >
  <h3>Pull down to refresh</h3>
  <div>{items}</div>
  <div>etc.</div>
</ReactPullToRefresh>
```

## All props

PropTypes
- **onRefresh**: `PropTypes.func.isRequired`
- **onMore**: `PropTypes.func`
- **label**: `PropTypes.string`
- **distanceToRefresh**: `PropTypes.number`
  - *default*: `70`
- **resistance**: `PropTypes.number`
  - *default*: `2.5`