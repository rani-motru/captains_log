const React = require('react');

class Index extends React.Component {
    render() {
        const { logs } = this.props;
        

        return (
            <div>
                <h1> My Ship Logs Page</h1>
                <nav>
                    <a href="/logs/new">Create a new Log</a>
                </nav>
                <ul>
                    {logs.map((log,i) =>{
                        return (
                           <li>
                            <a href={`/logs/${log._id}`}>
                                Day:{' '}  {log.title} </a>
                                <br/>
                                <br/>
                                Log:{' '}  {log.entry}
                                <br/>
                                Ship Status:{' '} {log.shipIsBroken ? `It is broken/need repairs` : `works Well!`}
                           
                            <br/>
                            <br/>
                            <a href={`/logs/${log._id}/edit`}> Edit This Log </a>
                            <br/>
                            <br/>
                            <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
                                <input type="submit" value="DELETE" />
                            </form>

                           </li>
                        )
                    })}
                </ul>
                </div>
                )
    }
}

module.exports = Index;