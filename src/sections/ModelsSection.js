import { ModelViewer } from '../components/ModelViewer';

export const ModelsSection = () => {
    return (
    <section id="models" className="bg-purple-light dark:bg-purple-dark text-purple-dark dark:text-purple-light max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-bold mb-12 text-center" id="models-heading">3D Models</h2>
            <div className="w-full h-[600px]">
                <ModelViewer />
            </div>
        </section>
    );
};
