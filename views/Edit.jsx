const React = require('react');

class Edit extends React.Component {
    render() {
        return (
            <div>
                <h1> Edit the Log </h1>
                <form action={`/logs/${this.props.log._id}?_method=PUT`} method="POST">
                    title: <input type="text" name="title" defaultValue={this.props.log.title} /><br />
                    entry: <input type="text" name="entry" defaultValue={this.props.log.entry} /><br />
                     shipIsBroken:
                    {this.props.log.shipIsBroken ? <input type="checkbox" name="shipISBroken" defaultChecked /> : <input type="checkbox" name="shipIsBroken" />}
                    <br />
                    <input type="submit" value="Submit Changes" />
                </form>
            </div>

        )
    }
}
module.exports = Edit;