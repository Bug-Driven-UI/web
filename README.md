Вкладка с внешними API
Создание:

- форма с полями (name, desc, params, endpoints)
- schema (JSON, подумать над валидацией)
- mappingScript (js code editor, подумать на LLM)

Вкладка с command
Создание:

- форма с полями (name, params)
- селект апишки из реестра
- селект с выбором template

Токены:

- цвета
- стили текста

Описание экрана:

- добавить description
- добавить выбор версии экрана (версия экрана и версия продовая отдельно)
- apis (форма с полями, apiName - селект внешних API)
- stateful - отдельный элемент в админке (условия сделать списком полей, drag&drop внутрь условий)
- dynamicColumn/dynamicRow (общий шаблон элемента)
- id подумать как валидировать повторы
- interactions (json editor)
- описание элементов (json editor)
- preview mode только ui (мб получиться сделать переходы в другие экраны с preview модом)

todo:

- lineHeight для текста (api актуализировать)
- api запретить сохранение при ошибках json/js (+)
- command.api.params.Value сделать text area (+)
- подставлять для json editor реальные названия itemTemplate, api ...
