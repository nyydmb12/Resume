import React from "react";


export default class Footer extends React.Component {
    render() {
        const footerStyles = {
            marginTop: "30px",
            marginLeft: "10px",
            bottom: "0px",
            position: "relative",
        };

        return (
            <footer style={footerStyles}>
                <div class="row">
                    <div class="col-lg-12">
                        <p>Hi!</p>
                    </div>
                </div>
            </footer>
        );
    }
}
