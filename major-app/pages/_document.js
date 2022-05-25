import Document, {Head, Html, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render() {
        <Html lang={'en'}>
            <Head/>
            <body>
            <Main/>
            <NextScript/>
            <div id={'notifications'}></div>
            </body>
        </Html>;
    }
}

export default MyDocument