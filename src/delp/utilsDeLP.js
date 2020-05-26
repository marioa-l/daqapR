export function getFormatedArgumentBody(argument) {
    return argument.replace(/-</g, "⤙").replace(/_G[0-9]+/g, "X").replace(/<-/g, "⇽");
}
