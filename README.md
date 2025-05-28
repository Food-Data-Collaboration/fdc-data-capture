# FDC DataCapture
Aggregate semantic sales data for FDC/DFC compliant platform cooperatives.

## Install
The Data Capture library requires the DFC Connector as a peer dependency, at
version `1.0.0-alpha.11` or higher (currently designated by the `@next`
[dist-tag] as of the Data Capture 1.0.0 release):

```sh
# Install the DFC Connector w/ @next dist-tag
npm i @datafoodconsortium/connector@next
# Install the FDC Data Capture library
npm i @fooddatacollaboration/fdc-data-capture
```

[dist-tag]: https://docs.npmjs.com/cli/v11/commands/npm-dist-tag

## Usage

To get started, add the following environment variables to your Node server's
application environment, replacing the values where needed:

```sh
# For the DataCapture wrapper function, `useDataCapture()`:
EXPERIMENTAL_DATA_CAPTURE_EXPORT_URL=http://localhost:3030/datacap
EXPERIMENTAL_DATA_CAPTURE_VERBOSE=false
EXPERIMENTAL_DATA_CAPTURE_USERNAME=admin
EXPERIMENTAL_DATA_CAPTURE_PASSWORD=admin
```

The URL is always required. Verbosity defaults to false and just prints activity
to the console, mainly for debugging purposes.

Then in your application, wherever you have an instance of the DFC Connector that you want to use to capture data, simply pass it to the `useDataCapture` function to start logging:

```js
import { Connector } from '@datafoodconsortium/connector';
import { useDataCapture } from 'dfc-data-capture';

const connector = new Connector();
const { observer, subscription } = useDataCapture(connector);
```

The `observer` can be used to reset the URL, and you can unsubscribe at any time using the subscription object:

```js
observer.url = 'https://api.example.net/ldp/v1/';
subscription.unsubscribe();
```

That should be all you need to get started. The `useDataCapture` function wraps the `DataCapture` class to take care of finding the environment variables and setting some reasonable defaults, but they can be overridden as a second parameter to useDataCapture, or the class can be imported independently.

Parameter types and other details can be ascertained from the TypeScript
[source]  and the [tests], until more documentation is available. Also refer to the [DFC Connector's documentation].

[source]: ./src
[tests]: ./test
[DFC Connector's documentation]: https://github.com/datafoodconsortium/connector-typescript

