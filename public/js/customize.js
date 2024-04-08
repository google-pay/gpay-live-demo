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

const paymentRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['MASTERCARD', 'VISA'],
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId',
        },
      },
    },
  ],
  merchantInfo: {
    merchantId: '12345678901234567890',
    merchantName: 'Demo Merchant',
  },
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPriceLabel: 'Total',
    totalPrice: '100.00',
    currencyCode: 'USD',
    countryCode: 'US',
  },
};

const button = document.querySelector('google-pay-button');

/** @type {HTMLSelectElement} */
const buttonColor = document.getElementById('button-color');
/** @type {HTMLSelectElement} */
const buttonType = document.getElementById('button-type');
/** @type {HTMLSelectElement} */
const buttonRadius = document.getElementById('button-radius');
/** @type {HTMLSelectElement} */
const buttonLocale = document.getElementById('button-locale');
/** @type {HTMLInputElement} */
const buttonCustom = document.getElementById('button-custom');
/** @type {HTMLInputElement} */
const buttonWidth = document.getElementById('button-width');
/** @type {HTMLInputElement} */
const buttonHeight = document.getElementById('button-height');
/** @type {HTMLSelectElement} */
const buttonLibrary = document.getElementById('button-library');

button.paymentRequest = paymentRequest;

buttonColor.addEventListener('change', event => {
  button.buttonColor = buttonColor.value;
  updateState();
});

buttonType.addEventListener('change', event => {
  button.buttonType = buttonType.value;
  updateState();
});

buttonLocale.addEventListener('change', event => {
  button.buttonLocale = buttonLocale.value;
  updateState();
});

buttonCustom.addEventListener('change', event => {
  button.buttonSizeMode = buttonCustom.checked ? 'fill' : 'static';

  buttonWidth.disabled = !buttonCustom.checked;
  buttonHeight.disabled = !buttonCustom.checked;

  button.style.width = `${buttonWidth.value}px`;
  button.style.height = `${buttonHeight.value}px`;

  updateState();
});

buttonWidth.addEventListener('change', event => {
  button.style.width =`${buttonWidth.value}px`;
  updateState();
});

buttonHeight.addEventListener('change', event => {
  button.style.height =`${buttonHeight.value}px`;
  updateState();
});

buttonRadius.addEventListener('change', event => {  
  button.buttonRadius = buttonRadius.value;
  updateState();
});

function handleSliderInput(event) {
  const element = event.target.parentElement.querySelector('.value');
  element.textContent = `(${event.target.value}px)`;
}

buttonWidth.addEventListener('input', handleSliderInput);
buttonHeight.addEventListener('input', handleSliderInput);
buttonRadius.addEventListener('input', handleSliderInput);

buttonLibrary.addEventListener('change', event => {
  library = buttonLibrary.value;
  updateState();
});

const libraryInfo = {
  javascript: {
    template: () => `<!-- html fragment -->
<div id="container"${button.buttonSizeMode === 'fill' ? ` style="width: ${buttonWidth.value}px; height: ${buttonHeight.value}px;"` : ''}></div>

// javascript fragment
const container = document.getElementById('container');
const button = googlePayClient.createButton({
  buttonColor: '${button.buttonColor || 'default'}',
  buttonType: '${button.buttonType || 'buy'}',
  buttonRadius: ${button.buttonRadius || 4},
  ${button.buttonLocale ? `buttonLocale: \'${button.buttonLocale}\',` : '__empty__'}
  ${button.buttonSizeMode === 'fill' ? 'buttonSizeMode: \'fill\',' : '__empty__'}
  onClick: () => {},
  allowedPaymentMethods: [] // use the same payment methods as for the loadPaymentData() API call
});

container.appendChild(button);`,
  },
  react: {
    github: 'https://github.com/google-pay/google-pay-button/blob/main/src/button-react#readme',
    template: () => `<GooglePayButton
  environment="TEST"
  buttonColor="${button.buttonColor || 'default'}"
  buttonType="${button.buttonType || 'buy'}"
  buttonRadius="${button.buttonRadius || '4'}"
  ${button.buttonLocale ? `buttonLocale="${button.buttonLocale}"` : '__empty__'}
  ${button.buttonSizeMode === 'fill' ? 'buttonSizeMode="fill"' : '__empty__'}
  ${button.buttonSizeMode === 'fill' ? `style={{width: ${buttonWidth.value}, height: ${buttonHeight.value}}}` : '__empty__'}
  />`,
  },
  angular: {
    github: 'https://github.com/google-pay/google-pay-button/blob/main/src/button-angular#readme',
    template: () => `<google-pay-button
  environment="TEST"
  buttonColor="${button.buttonColor || 'default'}"
  buttonType="${button.buttonType || 'buy'}"
  buttonRadius="${button.buttonRadius || '4'}"
  ${button.buttonLocale ? `buttonLocale="${button.buttonLocale}"` : '__empty__'}
  ${button.buttonSizeMode === 'fill' ? 'buttonSizeMode="fill"' : '__empty__'}
  ${button.buttonSizeMode === 'fill' ? `style="width: ${buttonWidth.value}px; height: ${buttonHeight.value}px;"` : '__empty__'}
></google-pay-button>`,
  },
  webcomponent: {
    github: 'https://github.com/google-pay/google-pay-button/blob/main/src/button-element#readme',
    template: () => `<google-pay-button
  environment="TEST"
  button-color="${button.buttonColor || 'default'}"
  button-type="${button.buttonType || 'buy'}"
  button-radius="${button.buttonRadius || '4'}"
  ${button.buttonLocale ? `button-locale="${button.buttonLocale}"` : '__empty__'}
  ${button.buttonSizeMode === 'fill' ? 'button-size-mode="fill"' : '__empty__'}
  ${button.buttonSizeMode === 'fill' ? `style="width: ${buttonWidth.value}px; height: ${buttonHeight.value}px;"` : '__empty__'}
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
