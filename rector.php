<?php

declare(strict_types=1);

use Rector\CodeQuality\Rector\Class_\InlineConstructorDefaultToPropertyRector;
use Rector\Config\RectorConfig;
use Rector\Doctrine\Set\DoctrineSetList;
use Rector\Nette\Set\NetteSetList;
use Rector\Php80\Rector\Class_\AnnotationToAttributeRector;
use Rector\Php80\ValueObject\AnnotationToAttribute;
use Rector\Set\ValueObject\LevelSetList;
use Rector\Symfony\Set\SensiolabsSetList;
use Rector\Symfony\Set\SymfonySetList;

/**
 * @link https://github.com/rectorphp/rector/blob/main/docs/rector_rules_overview.md
 */
return static function (RectorConfig $rectorConfig): void {
    $rectorConfig->paths([
        __DIR__ . '/src'
    ]);


    // register a single rule
//    $rectorConfig->rule(InlineConstructorDefaultToPropertyRector::class);
//    $rectorConfig->ruleWithConfiguration(
//        AnnotationToAttributeRector::class,
//        [new AnnotationToAttribute('Symfony\Component\Routing\Annotation\Route')]
//    );

    $rectorConfig->sets([
                            DoctrineSetList::ANNOTATIONS_TO_ATTRIBUTES,
                            SymfonySetList::ANNOTATIONS_TO_ATTRIBUTES,
                            NetteSetList::ANNOTATIONS_TO_ATTRIBUTES,
                            SensiolabsSetList::FRAMEWORK_EXTRA_61,
                        ]);

    // define sets of rules
    //    $rectorConfig->sets([
    //        LevelSetList::UP_TO_PHP_80
    //    ]);
};
