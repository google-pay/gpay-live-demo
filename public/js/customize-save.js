/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let library = 'javascript';
const button = document.querySelector('save-to-google-pay-button');
/** @type {HTMLSelectElement} */
const buttonLibrary = document.getElementById('button-library');

[...document.querySelectorAll('select')].forEach(select => {
  select.addEventListener('change', event => {
    const { name, value } = event.target;

    button.setAttribute(name, value);
    updateState();
  });
});

buttonLibrary.addEventListener('change', event => {
  library = buttonLibrary.value;
  updateState();
});

const libraryInfo = {
  javascript: {
    template: () => `<!-- html fragment -->
<div id="container"></div>

// javascript fragment
gapi.savetoandroidpay.render('container', {
  jwt: 'eyJhbGci...7_eD2kT3_IuHxw',
  height: '${button.height || 'small'}',
  ${button.size ? `size: '${button.size}',` : '__empty__'}
  ${button.textsize ? `textsize: '${button.textsize}',` : '__empty__'}
  ${button.theme ? `theme: '${button.theme}',` : '__empty__'}
});`,
  },
  react: {
    github: 'https://github.com/google-pay/save-to-google-pay-button/blob/main/src/save-button-react#readme',
    template: () => `<SaveToGooglePayButton
  jwt="eyJhbGci...7_eD2kT3_IuHxw"
  height="${button.height || 'small'}"
  ${button.size ? `size="${button.size}"` : '__empty__'}
  ${button.textsize ? `textsize="${button.textsize}"` : '__empty__'}
  ${button.theme ? `theme="${button.theme}"` : '__empty__'}
  />`,
  },
  angular: {
    github: 'https://github.com/google-pay/save-to-google-pay-button/blob/main/src/save-button-angular#readme',
    template: () => `<save-to-google-pay-button
  jwt="eyJhbGci...7_eD2kT3_IuHxw"
  height="${button.height || 'small'}"
  ${button.size ? `size="${button.size}"` : '__empty__'}
  ${button.textsize ? `textsize="${button.textsize}"` : '__empty__'}
  ${button.theme ? `theme="${button.theme}"` : '__empty__'}
></google-pay-button>`,
  },
  webcomponent: {
    github: 'https://github.com/google-pay/save-to-google-pay-button/blob/main/src/save-button-element#readme',
    template: () => `<save-to-google-pay-button
  jwt="eyJhbGci...7_eD2kT3_IuHxw"
  height="${button.height || 'small'}"
  ${button.size ? `size="${button.size}"` : '__empty__'}
  ${button.textsize ? `textsize="${button.textsize}"` : '__empty__'}
  ${button.theme ? `theme="${button.theme}"` : '__empty__'}
></google-pay-button>`,
  },
};

/** @type {HTMLPreElement} */
const sampleCode = document.querySelector('.sample-code');
/** @type {HTMLParagraphElement} */
const githubLink = document.getElementById('github');

function updateState() {
  const info = libraryInfo[library];
  sampleCode.textContent = info.template().replace(/^\s+__empty__$\n/gm, '');

  if (info.github) {
    githubLink.querySelector('a').href = info.github;
    githubLink.style.display = 'block';
  } else {
    githubLink.style.display = 'none';
  }
}

updateState();
