import type { History, Local } from './@types/index.js';
import { i18n, replaceNull } from './utility/i18n.js';
import { runtime, timeout } from './utility/utility.js';

i18n(['historyNoHistoryText']);

const { history } = (await runtime.storage.local.get(['history'])) as Pick<Local, 'history'>;

const container = document.getElementById('container') as HTMLDivElement;
const output = document.getElementById('output') as HTMLSpanElement;

const input = runtime.i18n.getMessage('historyOutputInput');
const username = runtime.i18n.getMessage('historyOutputUsername');
const uuid = runtime.i18n.getMessage('historyOutputUUID');

let index = 0;

await generateHistory();

container.addEventListener('scroll', async () => {
    if (
        Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) <= 500
        && index < history.length
    ) {
        await generateHistory();
    }
});

runtime.storage.onChanged.addListener((changes) => {
    if (changes.lastSearch) {
        output.innerHTML = generateItem(changes.lastSearch.newValue) + output.innerHTML;
    }
});

async function generateHistory() {
    const playerArray: string[] = [];
    const increase = Math.min(history.length, Math.max(index * 2, 25));

    for (; index < increase; index += 1) {
        const item = history[index];
        if (item) {
            playerArray.push(generateItem(item));
        }
    }

    // avoid blocking the main thread
    await timeout(1);

    output.innerHTML += playerArray.join('');
}

function generateItem(item: History) {
    const searchEpoch = Number(item.epoch);

    return `<div id="output" class="flex flex-col font-normal gap-2 peer">
                <div class="flex flex-col bg-neutral-300 dark:bg-neutral-800 rounded-sm gap-2 p-2">
                    <div class="flex w-full h-fit justify-between">
                        <span class="font-semibold text-sm count"></span>
                        <span class="font-semibold text-sm">
                            ${new Date(searchEpoch).toLocaleString(undefined, {
        timeStyle: 'medium',
        dateStyle: 'medium',
    })}
                        </span>
                    </div>
                    <span class="break-words text-xs">
                        <b>${input}:</b> ${replaceNull(item.input)}<br>
                        <b>${username}:</b> ${replaceNull(item.username)}<br>
                        <b>${uuid}:</b> ${replaceNull(item.uuid)}<br>
                    </span>
                </div>
            </div>`;
}
