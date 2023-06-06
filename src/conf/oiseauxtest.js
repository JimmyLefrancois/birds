import orderBy from 'lodash/orderBy'

export const birdsList = orderBy([
    {value: 0, text: "Accenteur alpin", link: "../oiseaux/accenteur.alpin.html"},
    {value: 1, text: "Accenteur de Radde", link: "../oiseaux/accenteur.de.radde.html"},
    {value: 2, text: "Accenteur montanelle", link: "../oiseaux/accenteur.montanelle.html"}
], ['text'], ['asc'])
