import * as vscode from 'vscode';

function calculateValue() {
	const settings = vscode.workspace.getConfiguration('smart-cursor-moving');
	const force = settings.get<string>('force') ?? "100";

	const isPercent = force.includes('%');
	const numValue = Number(force.replace("%", "")) || 100;

	if (!isPercent) {
		return numValue;
	}

	const range = vscode.window.activeTextEditor?.visibleRanges[0];

	const start = range?.start.line || 0;
	const end = range?.end.line || 0;

	return ((end - start) / 100) *  numValue;
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('smart-cursor-moving.up', () => {
			vscode.commands.executeCommand("cursorMove", {
				to: "up", value: calculateValue()
			});
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('smart-cursor-moving.down', () => {
			vscode.commands.executeCommand("cursorMove", {
				to: "down", value: calculateValue()
			});
		})
	);
}

export function deactivate() {}
