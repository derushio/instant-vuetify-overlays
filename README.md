# instant-vuetify-overlays
## Description
* Utility for `https://vuetifyjs.com`
    * programmable snackbar, dialog, progress component

## Instalation
```bash
npm install --save instant-vuetify-overlays
```

```ts
import Vue from 'vue';
import Vuetify from 'vuetify';
import InstantVuetifyOverlays from 'instant-vuetify-overlays';

Vue.use(Vuetify);
Vue.use(InstantVuetifyOverlays);
```

## Basic usage in vue class

### Snackbar
* `https://vuetifyjs.com/en/components/snackbars`

#### alert
```ts
// basic (timeout: 5000ms)
this.$vsnackbar.alert('Hello');
```

```ts
// with timeout (timeout: 0 is disable auto close)
this.$vsnackbar.alert({ message: 'Hello', timeout: 500 });
```

```ts
// wait to push ok button
await this.$vsnackbar.alert({ message: 'Hello', timeout: 0 }).promise;
```

```ts
// manual close
const vsnackbar = this.$vsnackbar.alert({ message: 'Hello', timeout: 0 }).vsnackbar;
vsnackbar.close();
```

### Dialog
* `https://vuetifyjs.com/en/components/dialogs`

#### alert
```ts
// basic
this.$vdialog.alert('Hello');
```

```ts
// wait to push ok button
await this.$vdialog.alert('Hello').promise;
```

```ts
// manual close
const vdialog = await this.$vdialog.alert('Hello').vdialog;
vdialog.ok();
```

### confirm
```ts
// promise
const result = await this.$vdialog.confirm('Hello').promise;
console.log(result.confirm);
```

```ts
// event handler
this.$vdialog.confirm({
    message: 'Hello',
    onClose: (result) => {
        console.log(result.confirm);
    },
});
```

```ts
// manual close
const vdialog = await this.$vdialog.confirm('Hello').vdialog;
vdialog.ok(); // or vdialog.cancel();
```
