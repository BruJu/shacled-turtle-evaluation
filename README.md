# Shacled Turtle Evaluation Website

This is the code used and the results collected to evaluate Shacled Turtle with
volunteers.

Volunteers were asked to translate two documents into Turtle. One document had
to be translated by using an editor that uses a naive approach to suggest terms
(i.e displays all the terms of the ontology), the other one by using an editor
that tries to be smart on the terms that are showed to the user (if a resource
is a person, only display the predicates related to the person type).

## Demo

You can see:
- The evaluation platform, with all the questions and possible answers: https://bruju.github.io/shacled-turtle-evaluation/experiment
- The collected results: https://bruju.github.io/shacled-turtle-evaluation/results


## How to

### Run the frontend

- `npm install`
- `cd front`
- `npm run start`

You can also `npm run build` to build the frontend into `../back/dist/parcel`

### Run the backend

- `cd back`
- `npm run start`

You can also `npm run build` to build the backend into `dist`.

If you `npm run build` both the frontend and the backend, you can just upload
the dist folder.


### See the results

- `cd results`
- `npm run start`


## License

Code is licensed under the MIT license by Julian Bruyat / INSA Lyon, but it is
not like the code is worthy to be copied.


- Files related to Schema.org are from [schema.org](https://github.com/schemaorg/schemaorg) repository, are released under the Apache Licence. Slight modifications
have been made: in one instance, transform the `schema:domainIncludes` /
`schema:rangeIncludes` with only one target class (or two but the other one
is schema:Text) into `rdfs:range` / `rdfs:domain` to be more Shacled Turtle friendly.
In the other instance, all terms have been declared as domain / range of every
classes to simulate the naive approach

- Files related to foaf are from the contributors of the ontology : https://xmlns.com/foaf/spec/ and have been slightly altered similarly as the files of schema.org.

