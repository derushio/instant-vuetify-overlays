# instant-vuetify-overlays
## Description
* Utility for `https://vuetifyjs.com`
    * programmable snackbar, dialog, progress component

## Instalation
```
npm install --save instant-vuetify-overlays
```

## Basic Usage in Vue class

### Snackbar
* `https://vuetifyjs.com/en/components/snackbars`

```
// basic (timeout: 5000ms)
this.$vsnackbar.alert('Hello');
```

```
// with timeout (timeout: 0 is disable auto close)
this.$vsnackbar.alert({ message: 'Hello', timeout: 500 });
```

```
// wait to push ok button
await this.$vsnackbar.alert({ message: 'Hello', timeout: 0 }).promise;
```

```
// manual close
const vsnackbar = this.$vsnackbar.alert({ message: 'Hello', timeout: 0 }).vsnackbar;
vsnackbar.close();
```
