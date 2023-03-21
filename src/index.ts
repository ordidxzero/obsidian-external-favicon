/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Plugin } from 'obsidian';

export default class ExternalLinkFaviconPlugin extends Plugin {
  async onload() {
    this.registerMarkdownPostProcessor(async element => {
      const targetLinks = Array.from(element.querySelectorAll('a')).filter(el => el.classList.contains('external-link'));
      for await (const link of targetLinks) {
        const extFavLink = element.createEl('a');
        extFavLink.classList.add('__external-favicon__container');

        const hostname = `${link.protocol}//${link.hostname}`;

        extFavLink.ariaLabel = hostname;
        extFavLink.rel = 'noopener';
        extFavLink.href = link.href;
        extFavLink.target = '_blank';

        const text = element.createEl('span');
        text.classList.add('__external-favicon__text');
        text.innerHTML = link.innerHTML;

        const faviconURL = `${hostname}/favicon.ico`;

        const img = element.createEl('img');
        img.classList.add('__external-favicon__img');

        img.src = faviconURL;

        img.onerror = () => {
          img.src = 'https://user-images.githubusercontent.com/60772480/226511375-ea4dace8-49c6-4660-8b3f-8b37dec58eb6.png';
        };

        const imgContainer = element.createEl('div');
        imgContainer.classList.add('__external-favicon__img-container');

        imgContainer.append(img);
        extFavLink.append(imgContainer, text);
        link.parentElement.style.display = 'inline-block';
        link.replaceWith(extFavLink);
        link.remove();
      }
    });
  }
}
