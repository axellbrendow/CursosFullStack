
// Manage colors for users
const usernameToColor = {};
const colorToUsername = {};

const getUserColor = (username) =>
{
    let color = usernameToColor[username];
    const userHasColor = !!color;

    if (!color)
    {
        do
        {
            const red = Math.round(Math.random() * 255);
            const green = Math.round(Math.random() * 255);
            const blue = Math.round(Math.random() * 255);
            color = `rgb(${red}, ${green}, ${blue})`;

        } while (colorToUsername[color]);
    }

    return [color, userHasColor];
};
exports.getUserColor = getUserColor;

const saveColor = (color, username) =>
{
    colorToUsername[color] = username;
    usernameToColor[username] = color;
}
exports.saveColor = saveColor;

const getUserColorAndSaveIt = (username) =>
{
    const [color, userHasColor] = getUserColor(username);

    if (!userHasColor) saveColor(color, username);

    return color;
}
exports.getUserColorAndSaveIt = getUserColorAndSaveIt;
