!(function (e) {
  function t(t) {
    for (
      var i, o, r = t[0], a = t[1], c = t[2], u = 0, h = [];
      u < r.length;
      u++
    ) {
      (o = r[u]),
        Object.prototype.hasOwnProperty.call(s, o) && s[o] && h.push(s[o][0]),
        (s[o] = 0);
    }
    for (i in a) {
      Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    for (d && d(t); h.length; ) {
      h.shift()();
    }
    return l.push.apply(l, c || []), n();
  }
  function n() {
    for (var e, t = 0; t < l.length; t++) {
      for (var n = l[t], i = !0, r = 1; r < n.length; r++) {
        const a = n[r];
        s[a] !== 0 && (i = !1);
      }
      i && (l.splice(t--, 1), (e = o((o.s = n[0]))));
    }
    return e;
  }
  const i = {};
  var s = {
    26: 0,
  };
  var l = [];
  function o(t) {
    if (i[t]) {
      return i[t].exports;
    }
    const n = (i[t] = {
      i: t,
      l: !1,
      exports: {},
    });
    return e[t].call(n.exports, n, n.exports, o), (n.l = !0), n.exports;
  }
  (o.m = e),
    (o.c = i),
    (o.d = function (e, t, n) {
      o.o(e, t) ||
        Object.defineProperty(e, t, {
          enumerable: !0,
          get: n,
        });
    }),
    (o.r = function (e) {
      typeof Symbol !== 'undefined' &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {
          value: 'Module',
        }),
        Object.defineProperty(e, '__esModule', {
          value: !0,
        });
    }),
    (o.t = function (e, t) {
      if ((1 & t && (e = o(e)), 8 & t)) {
        return e;
      }
      if (4 & t && typeof e === 'object' && e && e.__esModule) {
        return e;
      }
      const n = Object.create(null);
      if (
        (o.r(n),
        Object.defineProperty(n, 'default', {
          enumerable: !0,
          value: e,
        }),
        2 & t && typeof e !== 'string')
      ) {
        for (const i in e) {
          o.d(n, i, ((t) => e[t]).bind(null, i));
        }
      }
      return n;
    }),
    (o.n = function (e) {
      const t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return o.d(t, 'a', t), t;
    }),
    (o.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (o.p = '');
  let r = (window.webpackJsonp = window.webpackJsonp || []);
  const a = r.push.bind(r);
  (r.push = t), (r = r.slice());
  for (let c = 0; c < r.length; c++) {
    t(r[c]);
  }
  var d = a;
  l.push([109, 0, 1]), n();
})({
  109(e, t, n) {
    n.r(t);
    const i = n(0);
    const s = n(17);
    const l = n(18);
    class o {
      constructor() {}

      initialize() {
        uniprot.subcell = this;
        const e = (e) => {
          this.clear();
          const t = i.a.bySelector('.subcell-image svg');
          t !== null &&
            i.a.setClass(
              t,
              e.className.indexOf('uniprot') !== -1 ? 'uniprot' : 'goimage'
            );
        };
        const t = i.a.bySelector('.subcell-image svg');
        i.a.byId('table-uniprot_annotation') !== null &&
        i.a.bySelector('#table-uniprot_annotation .noLocations', !0).length ===
          0
          ? (new l.a('.subcell-image', 'uniprot_annotation', e).initialize(),
            t !== null && i.a.setClass(t.parentNode, 'uniprot'))
          : i.a.byId('table-go_annotation') !== null &&
            i.a.bySelector('#table-go_annotation .noLocations', !0).length ===
              0 &&
            (new l.a('.subcell-image', 'go_annotation', e).initialize(),
            t !== null && i.a.setClass(t.parentNode, 'goimage'));
      }

      locationClicked(e) {
        const t = i.a.bySelector(`.${e}`);
        const n = i.a.bySelector('.subcell-image');
        if (t.style.textDecoration === 'underline') {
          (t.style.textDecoration = 'none'), this.clearAllBackGround(n);
        } else {
          i.a.flatMap(this.getVisibleTabContent(n), (t) =>
            i.a.bySelector(`li.${e.split('_Label')[0]}`, !0, t)
          ).length > 0 &&
            (this.clear(),
            (t.style.textDecoration = 'underline'),
            this.highlightBackGround(n, e.split('_Label')[0]));
        }
      }

      clear() {
        const e = i.a.bySelector('.subcell-image');
        this.clearAllLabels(e), this.clearAllBackGround(e);
      }

      clearAllLabels(e) {
        i.a
          .bySelector('g.Labels text', !0, e)
          .forEach((e) => (e.style.textDecoration = 'none'));
      }

      clearAllBackGround(e) {
        this.flatMaps(
          e,
          (e) => i.a.bySelector('li.highlighted', !0, e),
          (e) => i.a.removeClass(e, 'highlighted')
        );
      }

      highlightBackGround(e, t) {
        this.flatMaps(
          e,
          (e) => i.a.bySelector(`li.${t}`, !0, e),
          (e) => i.a.addClass(e, 'highlighted')
        );
      }

      getVisibleTabContent(e) {
        return i.a
          .bySelector('.tabsContent', !0, e)
          .filter((e) => e.style.display !== 'none');
      }

      flatMaps(e, t, n) {
        const s = this.getVisibleTabContent(e);
        i.a.flatMap(s, t).forEach(n);
      }
    }
    const r = n(19);
    const a = n(28);
    const c = n(62);
    const d = n.n(c);
    class u {
      constructor() {}

      initialize() {
        window.customElements.get('sib-swissbiopics-sl')
          ? this.attach()
          : (window.customElements.define('sib-swissbiopics-sl', d.a),
            window.customElements.whenDefined(d.a).then(() => {
              this.attach();
            }));
      }

      attach() {
        document.querySelectorAll('sib-swissbiopics-sl').forEach((e) => {
          const t = e.shadowRoot;
          const n = e.getAttribute('contentid');
          t.addEventListener('svgloaded', () => this.addTooltipsToSvg(t, n)),
            n !== null && this.addTooltipsToSvg(t, n);
        });
        const e = document.querySelector('.go_sl_annotation');
        const t = document.querySelector('.uniprot_sl_annotation');
        e !== null &&
          t !== null &&
          (e.addEventListener('click', (e) => this.toggleTabs(e)),
          t.addEventListener('click', (e) => this.toggleTabs(e)));
      }

      toggleTabs(e) {
        const t = document.getElementById('sib-swissbiopics-sl-go');
        const n = document.getElementById('sib-swissbiopics-sl-uniprot');
        t !== null &&
          n !== null &&
          (t.hidden
            ? ((t.hidden = !1),
              (n.hidden = !0),
              document
                .querySelector('.go_sl_annotation.tab')
                .classList.add('tab-current'),
              document
                .querySelector('.uniprot_sl_annotation.tab')
                .classList.remove('tab-current'))
            : ((t.hidden = !0),
              (n.hidden = !1),
              document
                .querySelector('.go_sl_annotation.tab')
                .classList.remove('tab-current'),
              document
                .querySelector('.uniprot_sl_annotation.tab')
                .classList.add('tab-current')));
      }

      addTooltipsToSvg(e, t) {
        const n = e.getElementById(t);
        void 0 === n.uniprot_evidence &&
          (new r.a(n).initialize(), (n.uniprot_evidence = !0)),
          new s.a().load(e);
        const i = [
          ':scope path',
          ':scope circle',
          ':scope rect',
          ':scope ellipse',
          ':scope polygon',
          ':scope line',
        ].join(',');
        e.querySelectorAll('svg .membranes .membrane.subcell_present').forEach(
          (e) => {
            const t = e.parentElement.parentElement;
            const s = n.querySelector(`#${e.id}term`);
            if (
              (this.setInPicture(s), t.classList.contains('subcell_present'))
            ) {
              void 0 === e.membrane && (e.membrane = []), e.membrane.push(e);
            } else {
              const s = e.querySelector('.subcell_name').textContent;
              const l = e.querySelector('.subcell_description').textContent;
              const o = this.getGoTerms(e);
              o.push(`#${e.id}term`);
              const r = n.querySelectorAll(o.join(','));
              const c = Array.from(t.querySelectorAll(i));
              const d = c.concat(Array.from(r)).filter((e) => e !== null);
              const u = c[c.length - 1];
              console.log('post', u),
                Object(a.a)(u, {
                  allowHTML: !0,
                  content: `${s}<br/>${l}`,
                  triggerTarget: d,
                });
            }
          }
        );
        e.querySelectorAll('svg .subcell_present:not(.membrane)').forEach(
          (e) => {
            this.setInPicture(n.querySelector(`#${e.id}term`));
            const t = e.querySelectorAll(i).values();
            const s = t.next().value;
            if (void 0 !== s) {
              this.attachTooltips(e, n, s, t);
            } else {
              const t = e.parentElement;
              if (!t.classList.contains('subcell_preseent')) {
                const s = t.querySelectorAll(i).values();
                const l = s.next().value;
                this.attachTooltips(e, n, l, s, !0);
              }
            }
          }
        );
        const l = e.querySelector('svg');
        if (l !== null) {
          n.style.height = '100%';
          const e =
            '<div class="legend"><span class="auto"> </span>Automatic annotation <span class="manual"> </span>Manual annotation</div>';
          l.insertAdjacentHTML('afterend', e);
        }
      }

      attachTooltips(e, t, n, i, s = !1) {
        const l = e.querySelector('.subcell_name').textContent;
        let o = e.querySelector('.subcell_description').textContent;
        s &&
          (o = `A part of the shown ${
            e.parentElement.querySelector('.subcell_name').textContent
          }.\n${o}`);
        const r = this.getGoTerms(e);
        r.push(`#${e.id}term`);
        let c = Array.from(t.querySelectorAll(r.join(',')));
        void 0 !== n.membrane && (c = c.concat(n.membrane));
        const d = [n]
          .concat(c)
          .concat(Array.from(i))
          .filter((e) => e !== null);
        c.forEach((e) => {
          this.setInPicture(e);
        }),
          Object(a.a)(n, {
            allowHTML: !0,
            content: `${l}<br/>${o}`,
            triggerTarget: d,
          });
      }

      getGoTerms(e) {
        return Array.from(e.classList.values())
          .filter((e) => e.startsWith('GO'))
          .map((e) => `.${e}`);
      }

      setInPicture(e) {
        if (e !== null) {
          const t = e.parentElement;
          t.nodeName === 'LI'
            ? t.classList.add('inpicture')
            : e.classList.add('inpicture');
        }
      }
    }
    const h = n(4);
    const p = n(12);
    const b = n(1);
    class m extends b.a {
      constructor(e, t = !1, n = 'alignForm') {
        super(e), (this.isActive = t), (this.formId = n);
      }

      initialize() {
        super.initialize();
      }

      click(e) {
        this.isActive && i.a.byId(this.formId).submit();
      }
    }
    const g = n(26);
    class f extends g.a {
      constructor(e, t) {
        super(e, t, 'uniprot');
      }
    }
    class y extends b.a {
      constructor(e) {
        super(e);
      }

      initialize() {
        super.initialize();
      }

      click(e) {
        const t = e.target.parentNode.querySelector('select');
        t.options[t.selectedIndex].innerHTML !== 'BLAST'
          ? (window.location = t.options[t.selectedIndex].value)
          : i.a.blastItem(t.id.split('tools-')[1]);
      }
    }
    class w extends f {
      constructor(e, t, n) {
        super(e, t, 'uniprot');
      }

      isInBasket() {
        return typeof isoforms !== 'undefined'
          ? isoforms.every((e) => uniprot.basket.isInBasket('uniprot', e))
          : (console.error('global variable isoforms is not defined'), !1);
      }

      click(e) {
        typeof isoforms !== 'undefined'
          ? (uniprot.basket.addItemsToBasket(isoforms, 'uniprot'),
            this.updateAddAdded())
          : console.error('global variable isoforms is not defined');
      }

      getEntryId() {
        return this.entryId;
      }
    }
    const S = n(6);
    const v = n(21);
    const A = n(14);
    const k = (n(16), n(31));
    class E {
      constructor(e) {
        (this.entryId = e),
          (this.addAllIsoformsToBasket = new w(
            'add-all-isoforms',
            'added-all-isoforms',
            e
          )),
          (this.addIsoformToBasket = i.a
            .bySelector('.add-isoform-basket-button', !0)
            .map((e) => new f(e.id, e.id.replace('add', 'added')))),
          (this.alignSequencesButton = new m('alignIsoformsFromSection', !0)),
          (this.toolButtons = i.a
            .bySelector('.run-isoform-tool', !0)
            .map((e) => new y(e.id)));
        i.a.byId('mapped-isoform-headers') !== null
          ? ((this.geneCentricCheckboxes = new k.a(
              'selectAll-potential-isoforms',
              '#sequences-section table'
            )),
            (this.geneCentricAddAllIsoformsToBasket = new v.a(
              'add-to-basket-gene-centric',
              this.geneCentricCheckboxes,
              'uniprot'
            )),
            (this.geneCentricBlastButton = new A.a(
              'blast-gene-centric-via-selection',
              this.geneCentricCheckboxes,
              'uniprot'
            )),
            (this.geneCentricAlignAllButton = new m(
              'alignAllIsoformsFromSection',
              !0,
              'alignAllForm'
            )))
          : ((this.geneCentricCheckboxes = null),
            (this.geneCentricAddAllIsoformsToBasket = null),
            (this.geneCentricBlastButton = null),
            (this.geneCentricAlignAllButton = null));
      }

      buttonsPressed(e, t) {
        const n = e.findIndex((e) => t === e.getId());
        return n !== -1 ? e[n] : null;
      }

      initialize() {
        this.addButtonClickHandlers(),
          this.initializeBasketButtons(),
          this.initializeShowHideSequences(),
          this.geneCentricCheckboxes !== null &&
            (this.geneCentricCheckboxes.initialize(),
            this.geneCentricAddAllIsoformsToBasket.initialize(),
            this.geneCentricBlastButton.initialize(),
            this.geneCentricAlignAllButton.initialize());
      }

      initializeShowHideSequences() {
        i.a.bySelector('#sequences a.show-link', !0).forEach((e) => {
          new S.a(
            e,
            e.parentNode.querySelector('a.hide-link'),
            e.parentNode.querySelector('div.sequence')
          ).initialize();
        });
      }

      addButtonClickHandlers() {
        i.a.byId('sequences').addEventListener('click', (e) => {
          const t = e.target.id;
          if (
            this.addAllIsoformsToBasket.exists() &&
            t === this.addAllIsoformsToBasket.getId()
          ) {
            this.addAllIsoformsToBasket.click(e), e.preventDefault();
          } else if (
            this.alignSequencesButton.exists() &&
            t === this.alignSequencesButton.getId()
          ) {
            this.alignSequencesButton.click(e), e.preventDefault();
          } else if (
            this.geneCentricAddAllIsoformsToBasket !== null &&
            this.geneCentricAddAllIsoformsToBasket.exists() &&
            t === this.geneCentricAddAllIsoformsToBasket.getId()
          ) {
            this.geneCentricAddAllIsoformsToBasket.click(e), e.preventDefault();
          } else if (
            this.geneCentricBlastButton !== null &&
            this.geneCentricBlastButton.exists() &&
            t === this.geneCentricBlastButton.getId()
          ) {
            this.geneCentricBlastButton.click(e), e.preventDefault();
          } else if (
            this.geneCentricAlignAllButton !== null &&
            this.geneCentricAlignAllButton.exists() &&
            t === this.geneCentricAlignAllButton.getId()
          ) {
            this.geneCentricAlignAllButton.click(e), e.preventDefault();
          } else {
            let n = this.buttonsPressed(this.addIsoformToBasket, t);
            n === null && (n = this.buttonsPressed(this.toolButtons, t)),
              n !== null && (n.click(e), e.preventDefault());
          }
        });
      }

      initializeBasketButtons() {
        this.addAllIsoformsToBasket.exists() &&
          this.addAllIsoformsToBasket.initialize(),
          this.addIsoformToBasket.forEach((e) => e.initialize());
      }
    }
    const C = n(2);
    const _ = n(45);
    const I = n(3);
    const q = n(47);
    const x = n(23);
    const L = n(22);
    class T extends L.a {
      constructor(e) {
        super(e);
      }

      renderContent() {
        return `<span>${
          i.a.byId('entry-history-content-container').innerHTML
        }</span>`;
      }

      postRendering(e) {
        super.postRendering(e), i.a.addClass(e, 'options-menu-large');
      }
    }
    class B extends b.a {
      constructor(e) {
        super(e);
      }

      getMenu() {
        return new T({
          id: this.id,
        });
      }
    }
    class z extends b.a {
      constructor(e, t) {
        super(e), (this.isActive = !0);
      }

      initialize() {
        super.initialize();
      }

      click(e) {
        window.location.href = `http://aquaria.ws/${entryId}`;
      }
    }
    class N extends I.a {
      constructor(e) {
        const t = [
          new q.a('blastButton'),
          new m('alignIsoforms', typeof isoforms !== 'undefined'),
          new x.a(
            'download-button',
            'uniprot',
            typeof isoforms !== 'undefined',
            typeof isoforms !== 'undefined'
          ),
          new g.a('add-entry-basket', 'added-entry-basket', 'uniprot'),
          new B('historyButton'),
        ];
        i.a.byId('aquaria') != null && t.push(new z('aquaria', e)), super(t);
      }
    }
    const j = ['cross_references', 'structure', 'sequences'];
    const P = {
      embl: 'https://www.ebi.ac.uk/ena/browser/view/',
      embl_cds: 'https://www.ebi.ac.uk/ena/browser/view/',
      genbank: 'https://www.ncbi.nlm.nih.gov/entrez/viewer.fcgi?db=nuccore&id=',
      ddbj: 'http://getentry.ddbj.nig.ac.jp/search/get_entry?accnumber=',
      genbank_cds:
        'https://www.ncbi.nlm.nih.gov/entrez/query.fcgi?db=protein&cmd=&term=',
      ddbj_cds: 'http://getentry.ddbj.nig.ac.jp/getentry/dad/',
      pdbe: 'https://www.ebi.ac.uk/pdbe-srv/view/entry/',
      rcsb: 'https://www.rcsb.org/structure/',
      pdbj: 'http://pdbj.org/mine/summary/',
    };
    class O {
      constructor() {
        this.addEventHandlersToInputs();
      }

      loadFromCookies() {
        j.map((e) => ({
          section: e,
          insd: uniprot.cookie.load(`radio-${e}-insd`),
          pdb: uniprot.cookie.load(`radio-${e}-pdb`),
        }))
          .filter((e) => e.insd != null || e.pdb != null)
          .forEach((e) => {
            if (e.insd != null) {
              i.a
                .querySelector(`input[name=insd-target-selector-${e.section}]`)
                .value.split(' ')[0]
                .toLowerCase();
              e.insd;
            }
            if (e.pdb != null) {
              i.a
                .querySelector(`input[name=pdb-target-selector-${e.section}]`)
                .value.split(' ')[0]
                .toLowerCase();
              e.insd;
            }
          });
      }

      addEventHandlersToInputs() {
        j
          .map((e) => ({
            section: e,
            inputs: i.a.bySelector(`input[name=insd-target-selector-${e}]`, !0),
          }))
          .filter((e) => e.inputs.length > 0)
          .forEach((e) => {
            Array.from(e.inputs).forEach((t) =>
              t.addEventListener('click', (t) => {
                this.handleEmblChange(t.target, e.section);
              })
            );
          }),
          j
            .map((e) => ({
              section: e,
              inputs: i.a.bySelector(
                `input[name=pdb-target-selector-${e}]`,
                !0
              ),
            }))
            .filter((e) => e.inputs.length > 0)
            .forEach((e) => {
              Array.from(e.inputs).forEach((t) =>
                t.addEventListener('click', (t) => {
                  this.handlePDBChange(t.target, e.section);
                })
              );
            });
      }

      handlePDBChange(e, t) {
        const n = e.value.split(' ')[0].toLowerCase();
        i.a.bySelector(`div#${t} a.pdb`, !0).forEach((e) => {
          (e.href = e.href.replace(P.pdbe, P[n])),
            (e.href = e.href.replace(P.rcsb, P[n])),
            (e.href = e.href.replace(P.pdbj, P[n]));
        }),
          uniprot.cookie.save_tmp(`radio-${t}-pdb`, n);
      }

      handleEmblChange(e, t) {
        const n = e.value.toLowerCase();
        i.a.bySelector(`div#${t} a.embl`, !0).forEach((e) => {
          (e.href = e.href.replace(P.embl, P[n])),
            (e.href = e.href.replace(P.genbank, P[n])),
            (e.href = e.href.replace(P.ddbj, P[n]));
        }),
          i.a.bySelector(`div#${t} a.embl_cds`, !0).forEach((e) => {
            (e.href = e.href.replace(P.embl_cds, P[`${n}_cds`])),
              (e.href = e.href.replace(P.genbank_cds, P[`${n}_cds`])),
              (e.href = e.href.replace(P.ddbj_cds, P[`${n}_cds`]));
          }),
          uniprot.cookie.save_tmp(`radio-${t}-insd`, n);
      }
    }
    class H extends C.a {
      constructor(e, t = !1) {
        super('uniprot'),
          (this.entryId = e),
          (this.isObsolete = t),
          t ||
            ((this.topNavigation = new _.a(e, t)),
            (this.actionButtonGroup = new N(this.entryId)),
            (this.sidebarNavigation = new p.a(t, 'uniprot')),
            (this.sequenceSection = new E()));
      }

      commLink() {
        const e = document.querySelector('#comm-link');
        e &&
          fetch(
            `https://community.uniprot.org/cgi-bin/bbsub_query?accession=${this.entryId}`,
            {
              mode: 'cors',
            }
          )
            .then((t) => {
              const n =
                t.status == 200 && t.headers.has('x-total-results')
                  ? t.headers.get('x-total-results')
                  : 0;
              n > 0 &&
                ((e.innerText = `Community curation (${n})`),
                (e.style.display = ''),
                e.setAttribute(
                  'href',
                  `https://community.uniprot.org/bbsub/bbsubinfo.html?accession=${this.entryId}`
                ),
                i.a.removeClass(e.nextElementSibling, 'icon-right'));
            })
            .catch((e) => console.error(e));
      }

      toggleExpandCollapse(e, t, n, s, l) {
        const o = /collapse/;
        const r = /expand/;
        const a = i.a.bySelector(e);
        a !== null &&
          a.addEventListener('click', (e) => {
            const i = e.target;
            o.test(i.getAttribute('class'))
              ? (i.setAttribute('class', 'icon_expand'),
                i.setAttribute('data-tippy', t),
                l(i))
              : r.test(i.getAttribute('class')) &&
                (i.setAttribute('class', 'icon_collapse'),
                i.setAttribute('data-tippy', n),
                s(i));
          });
      }

      initializeListExpansions() {
        this.toggleExpandCollapse(
          'div.taxonomy',
          'Show complete lineage',
          'Show abbreviated lineage',
          (e) => {
            i.a.showElements(e.parentNode.querySelectorAll('.hiddenTaxon'));
          },
          (e) => {
            i.a.hideElements(e.parentNode.querySelectorAll('.hiddenTaxon'));
          }
        ),
          i.a.bySelector('div.secondaryAcs') &&
            this.toggleExpandCollapse(
              'div.secondaryAcs',
              'Show all accession numbers.',
              'Show less accession numbers.',
              (e) => {
                i.a.showElement(e.parentNode.nextElementSibling);
              },
              (e) => {
                i.a.hideElement(e.parentNode.nextElementSibling);
              }
            );
      }

      initializeFeaturesActions() {
        i.a.bySelector('table.featureTable tbody', !0).forEach((e) => {
          e.addEventListener('click', (e) => {
            const t = e.target;
            i.a.matches(t, {
              'a.blastSubsequences': (e) => {
                const t = i.a.findParent(e, 'tr');
                t !== null &&
                  i.a.triggerClick(t.querySelector('td.numeric a.position'));
              },
              '.subsequences': (e) => {
                if (!i.a.hasClass(e, 'disabled')) {
                  const t = e
                    .getAttribute('id')
                    .replace('_', '[')
                    .replace('_', ']');
                  uniprot.basket.addItemsToBasket([t], 'uniprot');
                }
              },
              'td.ft-sequence svg': (e) => {
                const t = i.a.findParent(e, 'tr');
                t !== null &&
                  i.a.triggerClick(t.querySelector('td.numeric a.position'));
              },
              'td.ft-sequence svg rect': (e) => {
                const t = i.a.findParent(e, 'tr');
                t !== null &&
                  i.a.triggerClick(t.querySelector('td.numeric a.position'));
              },
            });
          });
        }),
          new $().initialize();
      }

      showFeaturesTable() {
        i.a.hideElements([
          i.a.byId('entry-overview'),
          i.a.bySelector('.sidebarsubsection'),
        ]),
          i.a.removeClass(i.a.bySelector('.viewBy > ul > li'), 'active'),
          i.a.addClass(i.a.byId('display-ft'), 'active');
        const e = i.a.bySelector('div.section', !0);
        i.a.showElements(e),
          typeof e[0].scrollIntoView === 'function' && e[0].scrollIntoView(!0),
          e.forEach((e) => {
            switch (e.id) {
              case 'structure':
                i.a.hideElements(e.children),
                  i.a.byId('secondarystructure') !== null &&
                    i.a.showElement(e.querySelector('h4')),
                  i.a.showElements(e.querySelectorAll('table.featureTable'));
                break;
              case 'sequences':
                Array.from(e.children).forEach((e) => {
                  e.id === 'sequences-section'
                    ? (i.a.hideElements(e.children),
                      i.a.showElement(e.children[0]))
                    : i.a.hideElement(e);
                }),
                  i.a
                    .bySelector('.featureTable', !0, e)
                    .forEach((e) =>
                      i.a.showElements([e, e.previousElementSibling])
                    );
                break;
              default:
                i.a.hideElements(
                  Array.from(e.children).filter(
                    (e) =>
                      !(
                        i.a.hasClass(e, 'featureTable') ||
                        (e.nextElementSibling !== null &&
                          i.a.hasClass(e.nextElementSibling, 'featureTable'))
                      )
                  )
                );
            }
          });
      }

      initializeSimilarProteins() {
        i.a.bySelector('#similar_proteins', !0).length != 0 &&
          i.a.bySelector('#similar_proteins ul.tabs', !0).length !== 0 &&
          (i.a.bySelector('#table-hundred table td.entry', !0).length > 0
            ? new l.a('#similar_proteins', 'hundred').initialize()
            : i.a.bySelector('#table-ninty table td.entry', !0).length > 0
            ? new l.a('#similar_proteins', 'ninty').initialize()
            : i.a.bySelector('#table-fifty table td.entry', !0).length > 0
            ? new l.a('#similar_proteins', 'fifty').initialize()
            : new l.a('#similar_proteins', 'hundred').initialize());
      }

      showHash(e) {
        switch (e) {
          case '#showFeaturesTable':
            this.showFeaturesTable();
            break;
          default:
            document.querySelector(e).scrollIntoView();
        }
      }

      initialize() {
        this.searchbar.initialize(),
          this.isObsolete ||
            (this.commLink(),
            this.topNavigation.initialize(),
            this.actionButtonGroup.initialize(),
            this.sidebarNavigation.initialize(),
            new O(),
            this.initializeListExpansions(),
            this.initializeFeaturesActions(),
            this.initializeSimilarProteins(),
            this.sequenceSection.initialize(),
            this.initializeStructureShowHideLink(),
            new o().initialize(),
            new u().initialize(),
            this.initializeCatalyticActivityViz(),
            this.intializeInteractionToggle(),
            this.attachHashChangeHandler());
      }

      async loadReaction(e) {
        const t = e
          .getAttribute('class')
          .split(' ')
          .filter((e) => e.startsWith('id-'))
          .map((e) => e.split('-')[1]);
        if (t.length > 0) {
          const n = await fetch(
            `/uniprot/${this.entryId}/reaction/RHEA-${t[0]}`
          );
          e.innerHTML = await n.text();
          const l = i.a.bySelector('.progressImage', !1, e.parentNode);
          l != null && i.a.removeElement(l),
            new s.a().addClickedTips(
              i.a.bySelector('.tooltipped-click', !0, e)
            );
          const o = i.a.bySelector('.showReaction', !1, e.parentNode);
          const r = i.a.bySelector('.hideReaction', !1, e.parentNode);
          i.a.showElement(r), i.a.hideElement(o), new S.a(o, r, e).initialize();
        }
      }

      showReaction(e) {
        e.setAttribute('data-icon', '8'),
          i.a.showElement(i.a.bySelector('.reactionWrapper', !1, e.parentNode)),
          e.addEventListener('click', (e) => this.hideReaction(e.target), {
            once: !0,
          });
      }

      hideReaction(e) {
        e.setAttribute('data-icon', '9'),
          i.a.hideElement(i.a.bySelector('.reactionWrapper', !1, e.parentNode)),
          e.addEventListener('click', (e) => this.showReaction(e.target), {
            once: !0,
          });
      }

      initializeCatalyticActivityViz() {
        const e = i.a.bySelector('.reactionWrapper', !0);
        e.forEach((e) => {
          const t = i.a.bySelector('.showReaction', !1, e.parentNode);
          const n = i.a.bySelector('.hideReaction', !1, e.parentNode);
          new S.a(t, n, e).initialize(),
            i.a.bySelector('.residue', !0, e).forEach((e) => {
              const t = e.querySelector('.zoom');
              const n = e.querySelector('img');
              t !== null && n !== null && new s.a().loadMagnifiedRxnImage(t);
            });
        }),
          e.length > 0 &&
            i.a.triggerClick(
              i.a.bySelector('.showReaction', !1, e[0].parentNode)
            );
      }

      loadReactions() {
        const e = i.a.bySelector('.reactionWrapper', !0);
        e
          .map((e) => i.a.bySelector('.showReaction', !1, e.parentNode))
          .filter((e) => e != null)
          .forEach((e) => {
            e.addEventListener(
              'click',
              (t) => {
                t.target.insertAdjacentHTML(
                  'afterend',
                  '<img class="progressImage" src="/images/progress.svg"/>'
                ),
                  this.loadReaction(
                    i.a.bySelector('.reactionWrapper', !1, e.parentNode)
                  );
              },
              {
                once: !0,
              }
            );
          }),
          e.length > 0 &&
            i.a.triggerClick(
              i.a.bySelector('.showReaction', !1, e[0].parentNode)
            );
      }

      initializeStructureShowHideLink() {
        i.a.byId('secondarystructure') !== null &&
          new S.a(
            i.a.byId('showSecStructTable'),
            i.a.byId('hideSecStructTable'),
            i.a.byId('secstructure_section')
          ).initialize();
      }

      intializeInteractionToggle() {
        const e = i.a.byId('showInteractionTable');
        e &&
          new S.a(
            e,
            i.a.byId('hideInteractionTable'),
            i.a.byId('interaction-table')
          ).initialize();
      }
    }
    class $ {
      constructor() {
        (this.elements = i.a.bySelector(
          'table.featureTable tbody .subsequences',
          !0
        )),
          (this.active = this.elements.length > 0);
      }

      initialize() {
        this.active && (uniprot.basket.subscribeAll(this), this.mark());
      }

      mark() {
        const e = uniprot.basket.getContent('uniprot');
        this.elements.forEach((t) => {
          const n = t.getAttribute('id').replace('_', '[').replace('_', ']');
          const s = i.a.bySelector('td', !1, t.closest('tr'));
          e.indexOf(n) !== -1
            ? (i.a.addClass(s, 'icon_inbasket'), i.a.addClass(t, 'disabled'))
            : (i.a.removeClass(s, 'icon_inbasket'),
              i.a.removeClass(t, 'disabled'));
        });
      }

      listen(e) {
        this.mark();
      }
    }
    new h.a(), new H(entryId, isObsolete).initialize();
  },
  62(e, t) {
    !(function (e) {
      const t = {};
      function n(i) {
        if (t[i]) {
          return t[i].exports;
        }
        const s = (t[i] = {
          i,
          l: !1,
          exports: {},
        });
        return e[i].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
      }
      (n.m = e),
        (n.c = t),
        (n.d = function (e, t, i) {
          n.o(e, t) ||
            Object.defineProperty(e, t, {
              enumerable: !0,
              get: i,
            });
        }),
        (n.r = function (e) {
          typeof Symbol !== 'undefined' &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, {
              value: 'Module',
            }),
            Object.defineProperty(e, '__esModule', {
              value: !0,
            });
        }),
        (n.t = function (e, t) {
          if ((1 & t && (e = n(e)), 8 & t)) {
            return e;
          }
          if (4 & t && typeof e === 'object' && e && e.__esModule) {
            return e;
          }
          const i = Object.create(null);
          if (
            (n.r(i),
            Object.defineProperty(i, 'default', {
              enumerable: !0,
              value: e,
            }),
            2 & t && typeof e !== 'string')
          ) {
            for (const s in e) {
              n.d(i, s, ((t) => e[t]).bind(null, s));
            }
          }
          return i;
        }),
        (n.n = function (e) {
          const t =
            e && e.__esModule
              ? function () {
                  return e.default;
                }
              : function () {
                  return e;
                };
          return n.d(t, 'a', t), t;
        }),
        (n.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (n.p = 'dist/'),
        n((n.s = 0));
    })([
      function (e, t, n) {
        n.r(t);
        const i = document.createElement('template');
        i.innerHTML =
          '<style>span.subcell_description {\n    padding-left: 0.5em;\n}\n\nul.subcell_present,\nul.notpresent {\n    list-style-type: none;\n    list-style: none;\n    padding: 0px;\n}\n\nul.subcell_present li::before {\n    content: "✓"\n}\n\nul.notpresent li::before {\n    content: "✗";\n}\n\n#swissbiopic {\n    display: grid;\n    grid-template-areas: "picture terms";\n    grid-template-columns: 1fr 1fr;\n    grid-column-gap: 10px;\n}\n\n.svg {\n    grid-area: picture;\n}\n\n.terms {\n    grid-area: terms;\n}\n</style><div id="swissbiopic"><div class="terms"></div></div>';
        class s extends HTMLElement {
          static anyNonOkIsAnError() {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          }

          constructor() {
            super(),
              (this.shadow = this.attachShadow({
                mode: 'open',
              })),
              this.shadow.appendChild(i.content.cloneNode(!0)),
              (this.wrapper = this.shadow.querySelector('#swissbiopic'));
            const e = document.getElementById('sibSwissBioPicsSlLiItem');
            if (e !== null) {
              (this.liItemTemplate = e.content),
                (this.terms = this.shadow.querySelector('.terms')),
                this.setAttribute('contentid');
            } else {
              if (this.getAttribute('contentid') === null) {
                throw 'Neither #sibSwissBioPicsSlLiItem template nor #sibSwissBioPicsSlUlOverride content set';
              }
              {
                const e = document.getElementById(
                  this.getAttribute('contentid')
                );
                if (e === null) {
                  throw 'Neither #sibSwissBioPicsSlLiItem template nor #sibSwissBioPicsSlUlOverride content set';
                }
                e.parentElement.removeChild(e),
                  this.wrapper.appendChild(e),
                  (e.hidden = !1),
                  (this.terms = e);
              }
            }
            const t = document.getElementById('sibSwissBioPicsStyle');
            if (t !== null) {
              const e = t.content.cloneNode(!0);
              this.shadow.append(e),
                this.shadow.insertAdjacentHTML(
                  'afterbegin',
                  '<style>.subcell_present li,\n.subcell_present path,\n.subcell_present circle,\n.subcell_present ellipse,\n.subcell_present polygon,\n.subcell_present rect,\n.subcell_present polyline,\n.subcell_present line {\n    fill: lightblue;\n    fill-opacity: .50;\n    background-color: lightblue;\n}\n\n.subcell_present ul.lookedAt,\n.subcell_present path.lookedAt,\n.subcell_present circle.lookedAt,\n.subcell_present ellipse.lookedAt,\n.subcell_present polygon.lookedAt,\n.subcell_present rect.lookedAt,\n.subcell_present polyline.lookedAt,\n.subcell_present line.lookedAt {\n    stroke: blue;\n    fill-opacity: .75;\n}\n\n.lookedAt {\n    stroke: orange;\n    fill: red;\n    fill-opacity: .25;\n    background-color: orange;\n}\n\n/*Cytoskeleton is special cased to not do a fill*/\n\n#SL0090 .lookedAt {\n    fill: none;\n}\n</style>'
                );
            } else if (this.getAttribute('styleid') !== null) {
              const e = document
                .getElementById(this.getAttribute('styleid'))
                .content.cloneNode(!0);
              this.shadow.append(e);
            }
            (this.sls = this.getAttribute('sls')),
              (this.gos = this.getAttribute('gos')),
              (this.taxid = this.getAttribute('taxid'));
          }

          render() {
            let e = fetch(
              ((e, t, n) => {
                const i = 'https://www.swissbiopics.org/';
                let s = `${i}/api/${t}/sl/${e}`;
                return n != null && (s = `${i}/api/${t}/go/${n}`), s;
              })(this.sls, this.taxid, this.gos)
            )
              .then(this.anyNonOkIsAnError)
              .then((e) => e.text())
              .then((e) => this.wrapper.insertAdjacentHTML('beforeend', e));
            this.liItemTemplate &&
              (e = e
                .then(() =>
                  this.addListOfPresentSubcellularLocations(
                    this.sls,
                    this.wrapper,
                    this.terms
                  )
                )
                .then(() =>
                  this.addListOfNotPresentSubcellularLocations(
                    this.sls,
                    this.wrapper,
                    this.terms
                  )
                )
                .then(() =>
                  this.addListOfNotFoundSubcellularLocations(
                    this.sls,
                    this.wrapper,
                    this.terms
                  )
                )),
              e
                .then(() => this.addEventHandlers(this.wrapper, this.terms))
                .then(() => this.shadow.appendChild(this.wrapper))
                .then(() =>
                  console.log(
                    'Added a custom SwissBioPicsSL to page. subcells:',
                    this.sls,
                    'taxid:',
                    this.taxid
                  )
                )
                .then(() => {
                  console.log('trigering event'),
                    this.shadow.dispatchEvent(new CustomEvent('svgloaded'));
                })
                .catch((e) => this.showErrorMessageToUser(e, this.shadow));
          }

          connectedCallback() {
            this.render();
          }

          showErrorMessageToUser(e, t) {
            console.log(e),
              (t.innerHTML =
                '<span class="failure">Failed to fetch a SwissBiopic</span>');
          }

          addListOfPresentSubcellularLocations(e, t, n) {
            const i = document.createElement('ul');
            i.className = 'subcell_present';
            for (const n of e.split(',')) {
              const e = `#SL${n.padStart(4, '0')}`;
              if (t.querySelector(e)) {
                const s = this.liItemTemplate.cloneNode(!0);
                i.appendChild(s), (s.className = 'subcell_present');
                const l = i.lastElementChild;
                const o = l.querySelectorAll(':scope .subcell_name')[0];
                (o.href = `https://www.uniprot.org/locations/${n}`),
                  (o.textContent = t.querySelector(
                    `:scope ${e} .subcell_name`
                  ).textContent),
                  (l.querySelectorAll(
                    ':scope .subcell_description'
                  )[0].textContent = t.querySelector(
                    `:scope ${e} > .subcell_description`
                  ).textContent),
                  (l.id = `SL${n.padStart(4, '0')}term`);
              }
            }
            n.appendChild(i);
          }

          addListOfNotPresentSubcellularLocations(e, t, n) {
            const i = document.createElement('ul');
            i.className = 'notpresent';
            const s = new Set();
            const l = Array.from(
              t.querySelectorAll(
                ':scope svg .subcellular_location:not(.subcell_present)'
              )
            )
              .sort((e, t) =>
                e
                  .querySelector(':scope > .subcell_name')
                  .textContent.localeCompare(
                    t.querySelector(':scope > .subcell_name').textContent
                  )
              )
              .filter((e) => {
                const t = e.querySelector(':scope > .subcell_name')
                  .parentElement.id;
                return !s.has(t) && (s.add(t), !0);
              });
            for (const e of l) {
              const t = this.liItemTemplate.cloneNode(!0);
              i.appendChild(t);
              const n = i.lastElementChild;
              const s = n.querySelectorAll(':scope .subcell_name')[0];
              (s.href = `https://www.uniprot.org/locations/${e.id.substring(
                2
              )}`),
                (s.textContent = e.querySelector(
                  ':scope > .subcell_name'
                ).textContent),
                (n.querySelectorAll(
                  ':scope .subcell_description'
                )[0].textContent = e.querySelector(
                  ':scope > .subcell_description'
                ).textContent),
                (n.id = `${e.id}term`),
                (n.className = 'notpresent');
            }
            n.appendChild(i);
          }

          addListOfNotFoundSubcellularLocations(e, t, n) {
            const i = document.createElement('ul');
            i.className = 'subcell_notfound';
            for (const n of e.split(',')) {
              const e = `SL${n.padStart(4, '0')}`;
              if (!t.querySelector(e)) {
                let t = this.liItemTemplate.cloneNode(!0);
                i.appendChild(t), (t = 'subcell_notfound');
                const s = i.lastElementChild;
                const l = s.querySelectorAll(':scope .subcell_name')[0];
                const o = s.querySelectorAll(':scope .subcell_name')[0];
                (l.href = `https://www.uniprot.org/locations/${n}`),
                  (l.textContent = e),
                  (s.id = `SL${n.padStart(4, '0')}term`),
                  fetch(
                    `https://sparql.uniprot.org/sparql?query=PREFIX+skos%3a+%3chttp%3a%2f%2fwww.w3.org%2f2004%2f02%2fskos%2fcore%23%3e%0d%0aPREFIX+rdfs%3a+%3chttp%3a%2f%2fwww.w3.org%2f2000%2f01%2frdf-schema%23%3e%0d%0aSELECT+%3flabel+%3fcomment+%0d%0aWHERE++%7b%0d%0a%09%3chttp%3a%2f%2fpurl.uniprot.org%2flocations%2f${n}%3e+skos%3aprefLabel+%3flabel+%3b+rdfs%3acomment+%3fcomment+.%0d%0a%7d&format=srj`
                  )
                    .then((e) => e.json())
                    .then((e) => this.injectNameAndDescription(e, l, o));
              }
            }
            n.appendChild(i);
          }

          injectNameAndDescription(e, t, n) {
            (t.textContent = e.results.bindings[0].label.value),
              (n.textContent = e.results.bindings[0].comment.value);
          }

          addEventHandlers(e, t) {
            const n = 'path, circle, ellipse, polygon, rect, polyline, line';
            for (const i of e.querySelectorAll(
              ':scope svg .subcellular_location'
            )) {
              for (const e of i.querySelectorAll(`:scope ${n}`)) {
                e.addEventListener('mouseenter', (e) =>
                  this.highLight(e, i, n)
                ),
                  e.addEventListener('mouseleave', (e) =>
                    this.removeHiglight(e, i, n)
                  );
              }
              if (i.id) {
                const e = t.querySelector(`:scope #${i.id}term`);
                e !== null &&
                  (e.addEventListener('mouseenter', (e) =>
                    this.highLight(e, i, n)
                  ),
                  e.addEventListener('mouseleave', (e) =>
                    this.removeHiglight(e, i, n)
                  ),
                  e.addEventListener(
                    'touchstart',
                    (e) => this.highLight(e, i, n),
                    {
                      passive: !0,
                    }
                  ),
                  e.addEventListener(
                    'touchend',
                    (e) => this.removeHiglight(e, i, n),
                    {
                      passive: !0,
                    }
                  ));
              }
            }
          }

          highLight(e, t, n) {
            const i = t.querySelector('.subcell_name');
            i.setAttribute('visibility', 'visible'),
              i.setAttribute('x', '0'),
              i.setAttribute('y', '1em');
            const s = t.querySelector('.subcell_description');
            s.setAttribute('visibility', 'visible'),
              s.setAttribute('x', '0'),
              s.setAttribute('y', '2em'),
              s.setAttribute('width', '20em');
            for (const e of t.querySelectorAll(n)) {
              e.classList.add('lookedAt');
            }
            const l = this.shadow.getElementById(`${t.id}term`);
            l !== null && l.classList.add('lookedAt');
          }

          removeHiglight(e, t, n) {
            t
              .querySelector('.subcell_name')
              .setAttribute('visibility', 'hidden'),
              t
                .querySelector('.subcell_description')
                .setAttribute('visibility', 'hidden');
            for (const e of t.querySelectorAll(n)) {
              e.classList.remove('lookedAt');
            }
            const i = this.shadow.getElementById(`${t.id}term`);
            i !== null && i.classList.remove('lookedAt');
          }
        }
        window.customElements.get('sib-swissbiopics-sl') ||
          window.customElements.define('sib-swissbiopics-sl', s);
      },
    ]);
  },
});
