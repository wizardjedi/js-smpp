import Notifications from '../src/Notifications';

test('Add notifications', () => {
    let notifications = new Notifications();

    notifications.addNotification('tag1', 'body1');
    notifications.addNotification('tag2', 'body2');
    notifications.addNotification('tag1', 'body3');

    expect(notifications.getAll())
        .toEqual(
            [
                {tag:'tag1', body:'body1'},
                {tag:'tag2', body:'body2'},
                {tag:'tag1', body:'body3'},
            ]
        );


    expect(notifications.getByTagName('tag1'))
        .toEqual(
            [
                {tag:'tag1', body:'body1'},
                {tag:'tag1', body:'body3'},
            ]
        );

    expect(notifications.getByTagName('tag2'))
        .toEqual(
            [
                {tag:'tag2', body:'body2'}
            ]
        );

    expect(notifications.getByTagName('tag3'))
        .toEqual([]);
});