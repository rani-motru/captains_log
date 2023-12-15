const React = require('react');
class Show extends React.Component {
    render () {
        const log = this.props.log;

        return (
            <div>
                <h1>Show Page</h1>
                <p> Day:{log.title} : 
                <br/>
                 Log: {log.entry}</p>
                 <br/>
                 Ship Status: {log.shipIsBroken ? 'It is broken/need repairs' : "works Well!"}
                <br/>
                {log.timestamp}
                <br/>
                <br/>
                <br/>
                <a href={`/logs`}> Go Back To all logs</a>
            </div>
        
        )
    }
}

module.exports = Show;
