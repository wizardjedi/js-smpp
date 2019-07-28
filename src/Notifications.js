class Notifications {
    constructor(){
        this.messages = [];
    }
    addNotification(tag, body, offset) {
        this.messages.push({tag, body, offset});
    }
    getAll() {
        return this.messages;
    }
    getByTagName(tag) {
        return (
            this
                .messages
                .filter(
                    item => item.tag === tag
                )
            );
    }
}

export default Notifications;