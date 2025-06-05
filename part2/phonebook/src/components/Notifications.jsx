function Notifications({messageNotification}) {
    if (!messageNotification.message) return null;

    return (
        <div className={`notification ${messageNotification.type}`}>
            {messageNotification.message}
        </div>
    )
}

export default Notifications