import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';

import {
    Form,
    FormItem,
    Button,
    Select,
    Option,
    Input,
    Progress,
    DatePicker,
    Upload,
    Radio,
    Checkbox,
    CheckboxGroup,
    Dialog,
	Pagination,
	Image,
    Icon,
    Message,
    Collapse,
    CollapseItem,
    Steps,
    Step,
    Popover
} from 'element-ui';

Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Input.name, Input);
Vue.component(Progress.name, Progress);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Upload.name, Upload);
Vue.component(Radio.name, Radio);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Dialog.name, Dialog);
Vue.component(Pagination.name, Pagination);
Vue.component(Image.name, Image);
Vue.component(Icon.name, Icon);
Vue.component(Message.name, Message);
Message.install = function (Vue, options) {
Vue.prototype.$message = Message
}
Vue.use(Message)
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(Steps.name, Steps);
Vue.component(Step.name, Step);
Vue.component(Popover.name, Popover);


