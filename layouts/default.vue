<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
  body{
    --basic-c: #FABC58;
    --font-c: #212121;
    --primary-font-c: #909090;
    --red-c: #FA5A5A;
    --green-c: #5AC73F;
    --link-c: #5577D7;
    --grey-c: #C0C1C2;
    --lgrey-c: #EFEFEF;
    --bgc: #FFFFFF;

    --basic-shadow: 0px 11px 22px -6px rgba(0, 0, 0, 0.25);
    --block-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.25);

    --trans: .2s ease-in-out;

    color: var(--font-c);
  }
  html {

    font-family:
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
}
</style>
