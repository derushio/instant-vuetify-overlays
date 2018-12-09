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

#### open
```ts
// open component with card
await this.$vdialog.open({ component: TestDialog, needCard: true }).promise;
```

#### alert
```ts
// basic
this.$vdialog.alert('Hello');
```

```ts
// title
this.$vdialog.alert({ title: 'Hi', message: 'Hello' });
```

```ts
// wait to push ok button
await this.$vdialog.alert('Hello').promise;
```

```ts
// manual close
const vdialog = this.$vdialog.alert('Hello').vdialog;
vdialog.ok();
```

#### confirm
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
const vdialog = this.$vdialog.confirm('Hello').vdialog;
vdialog.ok(); // or vdialog.cancel();
```

#### prompt
```ts
// promise
const result = await this.$vdialog.prompt('Hello').promise;
if (result.confirm) {
    console.log(result.text);
}
```

```ts
// no cancel
const result = await this.$vdialog.prompt({
    message: 'Hello',
    persistent: true,
}).promise;
console.log(result.text);
```

```ts
// event handler
this.$vdialog.prompt({
    message: 'Hello',
    onClose: (result) => {
        if (result.confirm) {
            console.log(result.text);
        }
    },
});
```

```ts
// timeout prompt
const vdialog = this.$vdialog.prompt('Hello').vdialog;
await wait(3000);
const reulst = vdialog.ok();
console.log(reulst.text);
```

### Progress
* `https://vuetifyjs.com/en/components/progress`

#### Loading
```ts
// basic
await this.$vprogress.circularLoading(async () => {
    await wait(1000);
});
```

```ts
// min time
await this.$vprogress.circularLoading(async () => {
    await wait(1000);
}, { minTime: 1000 });
```

#### Timer
```ts
// basic
await this.$vprogress.circularTimer(1000);
```

#### Progress
```ts
// basic (setProgress(percent: number) => void)
await this.$vprogress.circularProgress(async (setProgress) => {
    await wait(1000);
    setProgress(25);
    await wait(1000);
    setProgress(90);
    await wait(1000);
    setProgress(100);
});
```
