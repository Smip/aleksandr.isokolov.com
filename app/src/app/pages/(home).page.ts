import { Component } from '@angular/core';
import {RouteMeta} from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: 'Aleksandr Sokolov | Frontend Developer',
  meta: [
    {
      name: 'description',
      content: 'Frontend Developer based in Poland. I specialize in building modern web applications using Angular and TypeScript.',
    },
    {
      name: 'author',
      content: 'Aleksandr Sokolov',
    },
    {
      property: 'og:title',
      content: 'Aleksandr Sokolov | Frontend Developer',
    },
    {
      property: 'og:description',
      content: 'Frontend Developer based in Poland. I specialize in building modern web applications using Angular and TypeScript.',
    }
  ],
};

@Component({
  selector: 'app-home',
  template: `
    <section class="max-w-[75%] mx-auto px-4 py-16">
      <p class="text-6xl font-bold mb-6">Hello.</p>
      <h1 class="text-2xl font-semibold mb-6">My name is Aleksandr Sokolov.</h1>

      <p class="text leading-relaxed mb-4">
        I’m a frontend developer based in Poland. I specialize in building modern web applications using
        <span class="text-black font-medium">Angular</span>, <span class="text-black font-medium">TypeScript</span>,
        <span class="text-black font-medium">RxJS</span>, and <span class="text-black font-medium">NgRx</span>.
        Currently, I work at <span class="text-black font-medium">Sanoma Learning</span>, where I develop educational
        solutions that support the digital transformation of learning.
      </p>

      <p class="text leading-relaxed mb-4">
        I have over 10 years of experience in creating user interfaces, optimizing performance, and implementing
        architectural solutions in large-scale projects.
      </p>

      <p class="text leading-relaxed">
        I'm passionate about technology, always eager to learn, and enjoy working on projects that bring real value.
        Feel free to connect with me on
        <a href="https://www.linkedin.com/in/soko1off/" class="linkedin">LinkedIn</a> or
        <a href="https://github.com/smip" class="github">GitHub</a> - I’m always open to new
        connections and collaboration.
      </p>
    </section>
  `,
  styles: `
    p.text {
      font-size: 1.3rem;
      font-weight: 300;
      line-height: 1.4;
      max-width: 28em;
      color: #364153;
    }
    a {
      text-decoration: none;
      white-space: nowrap;
      position: relative;
      &.linkedin {
        &:after {
          background-color: #1a68bf80;
        }
      }
      &.github {
        &:after {
          background-color: #00823680;
        }
      }
      &:after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 66%;
        left: -0.1em;
        right: -0.1em;
        bottom: 0;
        transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1);
      }
      &:hover:after {
        top: 0;
      }
    }
  `
})
export default class HomeComponent {
}
