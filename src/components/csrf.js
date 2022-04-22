import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const mapStateToProps = (state) =>({
    login_status : state.login_status,
    csrftoken: state.csrftoken
})

const CSRFToken = (props) => {
    function getCookie(name) {
        let cookieValue
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = props.csrftoken

    const token = ('; '+ csrftoken).split(`; XSRF-TOKEN=`).pop().split(';')[0];
    console.log(token)
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={token} />
    );
};
export default connect(mapStateToProps, {})(CSRFToken);