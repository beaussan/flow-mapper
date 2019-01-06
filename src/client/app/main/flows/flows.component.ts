import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';

import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

@Component({
  selector: 'fl-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss'],
})
export class FlowsComponent implements OnInit {
  nodes: any[] = [
    {
      id: 'start',
      label: 'App1',
      options: {
        color: '#FFFFFF',
      },
    },
    {
      id: '1',
      label: 'TCP',
      options: {
        color: '#FFFFFF',
      },
    },
    {
      id: '2',
      label: 'Proxy Laravel',
      options: {
        color: '#FFFFFF',
      },
    },
    {
      id: '3',
      label: 'Traefik',
    },
    {
      id: '4',
      label: 'UDP',
    },
    {
      id: '5',
      label: 'RabbitMQ',
    },
    {
      id: '6',
      label: 'App2',
    },
  ];

  links: any[] = [
    {
      source: 'start',
      target: '1',
      label: 'links to',
    },
    {
      source: '1',
      target: '2',
    },
    {
      source: '2',
      target: '3',
      label: 'links to',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '5',
      target: '6',
    },
  ];

  items: any[] = ['test', 'test', 'test', 'test', 'test', 'test', 'test'];

  curve: any = shape.curveLinear;
  view: any[];
  autoZoom = true;
  panOnZoom = true;
  enableZoom = true;
  autoCenter = false;
  showLegend = false;
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(
    private fuseTranslationLoaderService: FuseTranslationLoaderService,
  ) {
    this.fuseTranslationLoaderService.loadTranslations(english, french);
  }

  ngOnInit() {}

  clickOnNode(event) {
    console.log(event);
  }

  getColor(node: any): string {
    console.log('COLOR: ', node);
    return node.options.color || '#ff00FF';
  }
}
