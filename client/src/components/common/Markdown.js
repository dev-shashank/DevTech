import * as React from "react";
import PropTypes from 'prop-types';
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const Markdown = ({
    value
}) => {
    const [setValue] = React.useState("");
    const [selectedTab] = React.useState("preview");

    return (
        <div className="form-group">
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(<ReactMarkdown source={markdown} />)
                }
                childProps={{
                    writeButton: {
                        hidden: true
                    },
                    previewButton: {
                        style: {
                            backgroundColor: 'grey',
                            border: '5px solid grey',
                            color: 'white'
                        }
                    }
                }}
            />
        </div>

    );
}

Markdown.propTypes = {
    value: PropTypes.string.isRequired
};

export default Markdown;