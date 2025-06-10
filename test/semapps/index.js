import { Buffer } from 'node:buffer';
import { Connector } from '@datafoodconsortium/connector';
import { DataCapture, useDataCapture } from '@fooddatacollaboration/fdc-data-capture';
import Undici from 'undici';

const connector = new Connector();
const address = connector.createAddress({
  semanticId: "http://myplatform.com/address/addressF",
  street: "f, place or Europe",
  postalCode: "0000f",
  city: "Brussels",
  country: "Belgium",
});

const capOrigin = 'http://172.28.5.0:3030';
const capPath = '/datacap';
const capUrl = capOrigin + capPath;

const username = 'admin';
const password = 'admin';
const buf = Buffer.from(username + ':' + password, 'utf-8');
const basicauth = `Basic ${buf.toString('base64')}`;
const headers = new Headers();
headers.set('Authorization', basicauth);
headers.set('Content-Type', 'application/ld+json');

Undici.fetch(capUrl, {
  method: 'POST',
  headers,
  body: '{"@context":"https://www.datafoodconsortium.org","@id":"http://myplatform.com/address/address1","@type":"dfc-b:Address","dfc-b:hasCity":"Brussels","dfc-b:hasCountry":"Belgium","dfc-b:hasPostalCode":"00001","dfc-b:hasStreet":"1, place or Europe"}',
  keepAliveTimeout: 30e3,
}).then((response) => {
  console.info('Undici Request Succeeded!');
  if (response) console.log(response);
  else console.log('No response.');
}).catch((reason) => {
  console.info('Undici Request Failed!');
  if (reason) {
    console.error(reason)
    console.info('Error props:', Object.getOwnPropertyNames(reason));
    console.info('Message:', reason.message);
    console.info('Cause:', reason.cause);
    if (reason.cause) {
      console.info('Cause props:', Object.getOwnPropertyNames(reason.cause));
    }
  } else console.log('No reason given.');
});

const options = { headers, verbose: true };
const observer = new DataCapture(capUrl, options)
const subDC = connector.subscribe('export', observer);

await connector.export([address]).then(() => {
  console.log('DataCapture: Success!');
}).catch((e) => {
  console.log('DataCapture: Failure!');
  console.error(e);
}).finally(() => { console.log('DataCapture: Finished.'); });
console.log('DataCapture: Unsubscribing...');
subDC.unsubscribe();
observer.verbose = false;

useDataCapture(connector, { url: capUrl, verbose: true, headers });

await connector.export([address]);
