const React = require('react');

class New extends React.Component {
    render () {
        return (
            <div>
                <h1>Create a Log </h1>
                {/* NOTE: action will be the route, method will be the HTTP verb */}
                <form action='/logs' method="POST">
                    title:  <input type="text" name="title" />
                    <br/>
                    <br/>
                    entry: < input type="text" name="entry"/> 
                    <br/>
                    <br/>
                    shipIsBroken: <input type="checkbox" name="shipIsBroken"/>
                     <br/>
                     <br/>
                    <input type="submit" name="" value="Create log"/>
                </form>
            </div>
        )
    }
}

module.exports = New;