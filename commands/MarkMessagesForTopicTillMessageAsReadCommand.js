'use strict';

const ReadReceipt = require('../models/ReadReceipt').default;

const readReceiptStore = require('../persistance/storage/ReadReceiptStore');
const messageStore = require('../persistance/storage/MessageStore');

class MarkMessagesForTopicTillMessageAsReadCommand
{
    constructor(tillMessage, subscriber)
    {
        this._tillMessage = tillMessage;
        this._subscriber = subscriber;
    }

    execute()
    {
        let tillMessage = this._tillMessage;
        let subscriber = this._subscriber;

        return messageStore.retrieveUnreadMessagesForTopicTillMessage(tillMessage.get('topic'), tillMessage, subscriber)
        .then((messages) =>
        {
            if(messages.size)
            {
                let readReceipts = messages.toSeq().map((currentMessage) =>
                {
                    let readReceipt = new ReadReceipt({
                        messageId: currentMessage.get('messageId'),
                        subscriber: subscriber
                    });

                    return readReceipt;
                }).toList();

                return readReceiptStore.createAll(readReceipts.toArray());
            }
            else
            {
                return [];
            }
        });
    }
}

module.exports = MarkMessagesForTopicTillMessageAsReadCommand;